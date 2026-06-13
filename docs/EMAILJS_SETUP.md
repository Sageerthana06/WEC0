# EmailJS Setup Guide

## Quick Setup (5 minutes)

Your contact form is now configured to send emails using **EmailJS**. Follow these steps to get it working:

### Step 1: Create EmailJS Account

1. Visit https://www.emailjs.com/
2. Click "Sign Up"
3. Create a free account (no credit card required)

### Step 2: Connect Your Email Service

1. Log in to EmailJS dashboard
2. Go to **Email Services**
3. Click **Create New Service**
4. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook**
   - **Or another provider**
5. Follow the setup wizard
6. Copy your **Service ID** (looks like: `service_xxxxx`)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
From: {{from_email}}
Name: {{from_name}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
Send Reply To: {{from_email}}
```

4. Copy your **Template ID** (looks like: `template_xxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxx`)

### Step 5: Update Configuration

1. Open `.env.local` file in your project
2. Replace the placeholder values:

```
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

3. Save the file
4. Restart your dev server: `npm run dev`

### Step 6: Test It Out

1. Go to your contact form
2. Fill in the form
3. Click "Send Message"
4. You should receive an email at your configured email address

## Environment Variables Reference

| Variable                   | Example                 | Purpose                         |
| -------------------------- | ----------------------- | ------------------------------- |
| `VITE_EMAILJS_PUBLIC_KEY`  | `xxxxxxxxxxxxxxxxxxxxx` | Identifies your EmailJS account |
| `VITE_EMAILJS_SERVICE_ID`  | `service_abc123xyz`     | Identifies your email provider  |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_xyz789abc`    | Identifies your email template  |

## Troubleshooting

### Emails not sending?

- Check browser console for errors
- Verify all three environment variables are correctly set
- Make sure your EmailJS service is verified in dashboard

### Got "Invalid Service ID" error?

- Copy the Service ID again from EmailJS dashboard
- Make sure there are no extra spaces

### Still having issues?

- Check EmailJS email logs in your dashboard
- Make sure your email template has the correct variable names
- Verify your email service is properly connected

## Free Tier Limits

- EmailJS free tier: 200 emails per month
- Perfect for small businesses and testing
- Upgrade anytime if you need more

## Questions?

- EmailJS Support: https://www.emailjs.com/docs/
- Template Variables Guide: https://www.emailjs.com/docs/user-guide/dynamic-template-variables/
