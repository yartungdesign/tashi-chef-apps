# DNS Check Instructions for cheftashi.cloud

## Quick DNS Verification

### Step 1: Check Current DNS Records

Visit your domain registrar's DNS management panel and verify:

**For apex domain (cheftashi.cloud):**
- Type: **A Record**
- Name: `@` or blank or `cheftashi.cloud`
- Value: `76.76.21.21`
- TTL: 3600 or Auto

**For www subdomain:**
- Type: **CNAME Record**
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 3600 or Auto

### Step 2: Check DNS Propagation

Use these tools to verify DNS is propagating globally:

1. **DNS Checker**: https://dnschecker.org/#A/cheftashi.cloud
   - Enter: `cheftashi.cloud`
   - Select: **A Record**
   - Check if all locations show: `76.76.21.21`

2. **What's My DNS**: https://www.whatsmydns.net/#A/cheftashi.cloud
   - Check global propagation status

3. **Command Line** (if available):
   ```bash
   # Check A record
   nslookup cheftashi.cloud
   
   # Check from Google DNS
   nslookup cheftashi.cloud 8.8.8.8
   
   # Check from Cloudflare DNS
   nslookup cheftashi.cloud 1.1.1.1
   ```

### Step 3: Check SSL Certificate

1. **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=cheftashi.cloud
   - Wait for analysis to complete
   - Check certificate status

2. **In Vercel Dashboard**:
   - Settings → Domains → `cheftashi.cloud`
   - Check SSL Certificate status
   - Should show "Valid" when DNS is fully propagated

## Expected Timeline

- **DNS Propagation**: 1-48 hours (usually 1-4 hours)
- **SSL Certificate**: Issues automatically once DNS is correct (usually instant to 1 hour)
- **Full Global Resolution**: Up to 48 hours

## Common Issues

### Issue: A Record Missing
**Symptom**: Domain doesn't resolve
**Fix**: Add A record pointing to `76.76.21.21`

### Issue: Wrong IP Address
**Symptom**: Domain resolves but SSL error
**Fix**: Update A record to `76.76.21.21`

### Issue: Conflicting Records
**Symptom**: Inconsistent behavior
**Fix**: Remove old A/AAAA records, keep only the Vercel A record

### Issue: DNS Not Propagated
**Symptom**: Works at home, fails elsewhere
**Fix**: Wait for propagation (can take up to 48 hours)

## Verification Checklist

- [ ] A record exists for `@` (apex domain)
- [ ] A record points to `76.76.21.21`
- [ ] CNAME record exists for `www`
- [ ] CNAME points to `cname.vercel-dns.com`
- [ ] No conflicting A/AAAA records
- [ ] DNS propagated globally (check dnschecker.org)
- [ ] SSL certificate shows "Valid" in Vercel
- [ ] Tested from different networks

## Still Not Working?

If after 48 hours the apex domain still doesn't work:

1. **Remove and re-add domain in Vercel**:
   - Settings → Domains → Remove `cheftashi.cloud`
   - Wait 5 minutes
   - Re-add `cheftashi.cloud`
   - Vercel will re-issue SSL certificate

2. **Use Vercel Nameservers** (Alternative):
   - Change nameservers at your registrar to:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - This gives Vercel full DNS control

3. **Contact Support**:
   - Vercel Support: https://vercel.com/support
   - Your domain registrar support
