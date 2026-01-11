# Email Setup Guide for Reservation Form

## Gmail Setup (Recommended for Development)

To receive reservation emails in your Gmail account, follow these steps:

### Step 1: Create Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", find **2-Step Verification** and enable it (if not already enabled)
4. After enabling 2-Step Verification, go back to Security
5. Under "Signing in to Google", you'll now see **App passwords**
6. Click on **App passwords**
7. Select **Mail** as the app and **Other (Custom name)** as the device
8. Enter "Sushi Chef Portfolio" as the name
9. Click **Generate**
10. **Copy the 16-character password** (you'll see it only once!)

### Step 2: Create .env File

1. In the `server` folder, create a file named `.env` (not `.env.example`)
2. Copy the contents from `server/env.example` and update with your details:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Gmail Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=gurungdava@gmail.com
EMAIL_PASS=your-16-character-app-password-here

# Email Settings
EMAIL_FROM=gurungdava@gmail.com
CONTACT_EMAIL=gurungdava@gmail.com
```

**Important:**
- Replace `your-16-character-app-password-here` with the App Password you generated
- Use your actual Gmail address: `gtashi076@gmail.com`
- The `CONTACT_EMAIL` is where reservation requests will be sent

### Step 3: Test the Setup

1. Start the server: `npm run server`
2. Fill out the reservation form on your website
3. Check your Gmail inbox for the reservation request

## For Production Deployment

When deploying to Vercel or other platforms, you'll need to:

1. **Set Environment Variables** in your hosting platform:
   - Go to your project settings
   - Find "Environment Variables"
   - Add the same variables from your `.env` file

2. **For Vercel specifically:**
   - Go to Project Settings → Environment Variables
   - Add each variable (EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, etc.)
   - Make sure to set them for "Production", "Preview", and "Development"

## Alternative: Resend (Recommended for Production)

For production, consider using Resend instead of Gmail:

1. Sign up at https://resend.com
2. Get your API key
3. Update `.env`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
CONTACT_EMAIL=gurungdava@gmail.com
```

## Troubleshooting

- **"Invalid login"**: Make sure you're using an App Password, not your regular Gmail password
- **"Less secure app"**: Gmail requires App Passwords for third-party apps
- **Not receiving emails**: Check spam folder, verify App Password is correct
