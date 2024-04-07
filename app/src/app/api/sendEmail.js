import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { toEmail, subject, text } = req.body;

  // Set your SendGrid API key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: toEmail,
    from: process.env.SENDGRID_SENDER_EMAIL,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
  
}

