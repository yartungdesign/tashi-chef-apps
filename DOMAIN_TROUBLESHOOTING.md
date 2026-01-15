# Domain SSL/DNS Troubleshooting Guide

## Problem
- ✅ Website works from home network with secure connection
- ❌ From other networks: "This site can't provide secure connection" or `ERR_SSL_PROTOCOL_ERROR`

## Root Causes
This is typically a **DNS propagation** or **SSL certificate** issue. Here's how to fix it:

---

## Step 1: Verify Domain in Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `tashi-chef-apps`
3. **Go to Settings → Domains**
4. **Check if `cheftashi.cloud` is listed**

### If domain is NOT listed:
- Click **"Add Domain"**
- Enter: `cheftashi.cloud`
- Follow Vercel's instructions to configure DNS

### If domain IS listed:
- Check the status:
  - ✅ **Valid Configuration** = Good
  - ⚠️ **Invalid Configuration** = DNS issue
  - ⏳ **Pending** = Still propagating (wait 24-48 hours)

---

## Step 2: Verify DNS Records

Your domain registrar (where you bought `cheftashi.cloud`) needs these DNS records:

### Required DNS Records for Vercel:

1. **A Record** (if using apex domain):
   ```
   Type: A
   Name: @ (or cheftashi.cloud)
   Value: 76.76.21.21
   TTL: 3600
   ```

2. **CNAME Record** (recommended):
   ```
   Type: CNAME
   Name: @ (or cheftashi.cloud)
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

3. **Alternative: Use Vercel's Nameservers** (easiest):
   - In your domain registrar, change nameservers to:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - Then add domain in Vercel

### How to Check Current DNS:
1. Go to: https://dnschecker.org/
2. Enter: `cheftashi.cloud`
3. Check if DNS records are propagated globally
4. If some regions show different IPs, DNS is still propagating

---

## Step 3: Check SSL Certificate Status

1. **In Vercel Dashboard**:
   - Go to **Settings → Domains**
   - Click on `cheftashi.cloud`
   - Check **SSL Certificate** status:
     - ✅ **Valid** = Certificate is issued
     - ⏳ **Pending** = Still being issued (can take up to 24 hours)
     - ❌ **Invalid** = DNS not configured correctly

2. **Force SSL Certificate Issue**:
   - Remove domain from Vercel
   - Wait 5 minutes
   - Re-add domain
   - Vercel will automatically issue a new SSL certificate

---

## Step 4: Verify Domain Configuration

### In Vercel Project Settings:

1. **Settings → Domains**:
   - Domain: `cheftashi.cloud`
   - Status: Should be "Valid Configuration"
   - SSL: Should be "Valid"

2. **Settings → General**:
   - Production Domain: Should show `cheftashi.cloud`
   - If it shows `*.vercel.app`, domain isn't connected

---

## Step 5: Common Issues & Fixes

### Issue 1: DNS Not Propagated Globally
**Symptom**: Works at home, fails elsewhere

**Fix**:
- Wait 24-48 hours for DNS propagation
- Clear DNS cache on your home network:
  ```bash
  # Windows
  ipconfig /flushdns
  
  # Mac/Linux
  sudo dscacheutil -flushcache
  ```

### Issue 2: Wrong DNS Records
**Symptom**: Domain not resolving

**Fix**:
- Verify DNS records match Vercel's requirements
- Use Vercel's nameservers (easiest option)
- Double-check for typos in DNS records

### Issue 3: SSL Certificate Not Issued
**Symptom**: ERR_SSL_PROTOCOL_ERROR

**Fix**:
- Ensure DNS is correctly configured first
- Remove and re-add domain in Vercel
- Wait for SSL certificate to be issued (up to 24 hours)

### Issue 4: Cached DNS
**Symptom**: Inconsistent behavior

**Fix**:
- Clear browser cache
- Try incognito/private mode
- Use different DNS server (8.8.8.8 or 1.1.1.1)

---

## Step 6: Test Your Domain

### Test DNS Propagation:
```bash
# Check DNS records
nslookup cheftashi.cloud

# Check from different locations
# Use: https://dnschecker.org/
```

### Test SSL Certificate:
```bash
# Check SSL certificate
openssl s_client -connect cheftashi.cloud:443 -servername cheftashi.cloud

# Or use online tool:
# https://www.ssllabs.com/ssltest/analyze.html?d=cheftashi.cloud
```

### Test Website:
- Use: https://www.whatsmydns.net/
- Enter: `cheftashi.cloud`
- Check if it resolves globally

---

## Step 7: Quick Fix Checklist

- [ ] Domain added in Vercel Dashboard
- [ ] DNS records configured correctly
- [ ] DNS propagated globally (check dnschecker.org)
- [ ] SSL certificate issued (check Vercel dashboard)
- [ ] Domain shows "Valid Configuration" in Vercel
- [ ] Cleared browser/DNS cache
- [ ] Tested from different networks/devices

---

## Still Not Working?

1. **Contact Vercel Support**:
   - Go to: https://vercel.com/support
   - Provide domain name and project details

2. **Check Domain Registrar**:
   - Ensure domain is active
   - Check if domain has any restrictions
   - Verify nameservers are correct

3. **Temporary Workaround**:
   - Use Vercel's default domain: `your-project.vercel.app`
   - This will always work while fixing custom domain

---

## Expected Timeline

- **DNS Propagation**: 1-48 hours (usually 1-4 hours)
- **SSL Certificate**: 1-24 hours (usually instant to 1 hour)
- **Full Resolution**: Up to 48 hours for global propagation

---

## Verification Commands

```bash
# Check DNS
dig cheftashi.cloud
nslookup cheftashi.cloud

# Check SSL
curl -I https://cheftashi.cloud

# Check from different DNS servers
dig @8.8.8.8 cheftashi.cloud
dig @1.1.1.1 cheftashi.cloud
```

---

**Last Updated**: Based on Vercel's current domain setup process
