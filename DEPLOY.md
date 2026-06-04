# Deploying to AWS EC2

This project is a TanStack Start app built for **Node SSR** (via Nitro's
`node-server` preset). It runs as a long-lived Node process on an EC2 instance
behind **nginx** as a TLS-terminating reverse proxy.

```text
Browser ──HTTPS──► nginx :443 ──proxy_pass──► Node SSR :3000
                     │
                     └── /assets/, /_build/ served directly (gzip + long cache)
```

No SEO, JSON-LD, sitemap, robots.txt, Airtable, or Lovable Cloud behavior
changes — only the runtime host.

---

## 1. Provision the EC2 instance

- **AMI**: Ubuntu 22.04 LTS (or 24.04)
- **Instance type**: `t3.small` minimum (2 vCPU / 2 GB RAM)
- **Disk**: 20 GB gp3
- **Security Group**: inbound 80/tcp, 443/tcp from `0.0.0.0/0`; 22/tcp from your admin IP only
- **Elastic IP**: attach one so the IP survives stop/start

Point your DNS `A` record (`investwellreviews.com`) at the Elastic IP.

---

## 2. Install runtime dependencies

```bash
# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git

# Optional but recommended
sudo apt-get install -y ufw
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw --force enable
```

---

## 3. Deploy the app

```bash
sudo mkdir -p /var/www/investwell
sudo chown -R ubuntu:ubuntu /var/www/investwell
cd /var/www/investwell
git clone <your-git-remote> .
npm ci
npm run build:ec2
```

Output lands in `.output/server/index.mjs` (Node entry) and `.output/public/`
(static assets).

---

## 4. Environment variables

```bash
sudo mkdir -p /etc/investwell
sudo tee /etc/investwell/.env >/dev/null <<'EOF'
NODE_ENV=production
PORT=3000

# Airtable (server-only)
AIRTABLE_PAT=...
AIRTABLE_BASE_ID=...
AIRTABLE_TABLE_ID=...

# Lovable Cloud / Supabase (publishable values — also baked into the client bundle at build time)
VITE_SUPABASE_URL=https://albvtfnhpkszqwxomunv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_m4Jo0KwwQty8gKfcXj8z2Q_2hf9xQf9
VITE_SUPABASE_PROJECT_ID=albvtfnhpkszqwxomunv
EOF
sudo chmod 600 /etc/investwell/.env
```

Note: `VITE_*` values must be set **at build time** so they end up in the
client bundle. Set them in your build environment (CI or directly on the EC2
box before `npm run build`), in addition to the systemd `EnvironmentFile`
used at runtime.

---

## 5. systemd service

`/etc/systemd/system/investwell.service`:

```ini
[Unit]
Description=Investwell Reviews (TanStack Start SSR)
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/var/www/investwell
EnvironmentFile=/etc/investwell/.env
ExecStart=/usr/bin/npm --prefix /var/www/investwell run start:ec2
Restart=always
RestartSec=3
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now investwell
sudo systemctl status investwell
# logs:
journalctl -u investwell -f
```

Quick local check:

```bash
curl -I http://127.0.0.1:3000/      # expect 200, content-type: text/html
```

---

## 6. nginx reverse proxy

`/etc/nginx/sites-available/investwell`:

```nginx
# Redirect HTTP → HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name investwellreviews.com www.investwellreviews.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name investwellreviews.com www.investwellreviews.com;

    # TLS certs (filled in by certbot in step 7)
    ssl_certificate     /etc/letsencrypt/live/investwellreviews.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/investwellreviews.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # gzip
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/ld+json image/svg+xml;
    gzip_vary on;

    # Long-cache hashed build assets
    location ~* ^/(assets|_build)/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Everything else — SSR
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        "upgrade";
        proxy_read_timeout 60s;
    }

    client_max_body_size 2m;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/investwell /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

---

## 7. TLS via Let's Encrypt

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d investwellreviews.com -d www.investwellreviews.com \
  --redirect --agree-tos -m admin@investwellreviews.com --no-eff-email
```

Certbot installs an auto-renew timer (`systemctl list-timers | grep certbot`).

---

## 8. Verification checklist

```bash
# 200 + HTML
curl -I https://investwellreviews.com/

# Title and JSON-LD present in initial HTML (SSR — not JS-dependent)
curl -s https://investwellreviews.com/ | grep -E '<title>|application/ld\+json'

# Dynamic sitemap + static text files
curl -I https://investwellreviews.com/sitemap.xml
curl -I https://investwellreviews.com/robots.txt
curl -I https://investwellreviews.com/llms.txt
```

Then run Lighthouse (mobile) — target ≥ 90, matching the Cloudflare baseline.
View-source diff against the previous deployment: `<head>`, JSON-LD blocks,
OG/Twitter tags, canonical, and GTM should be byte-identical.

---

## 9. Updating the app

```bash
cd /var/www/investwell
git pull
npm ci
npm run build:ec2
sudo systemctl restart investwell
```

For zero-downtime later: add an Application Load Balancer in front of two
EC2 instances and roll one at a time.

---

## Notes

- **Lovable in-editor preview** keeps working because `vite dev` is unchanged.
- **Lovable Publish** no longer deploys this project — EC2 is now the source of truth.
- All server-only secrets (`AIRTABLE_*`) are read via `process.env` inside
  server functions and never reach the client bundle.