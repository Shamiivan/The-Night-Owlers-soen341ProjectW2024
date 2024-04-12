import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  console.log('Starting email send request');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { to, subject, body } = req.body;

  console.log('Received request data:', { to, subject, body });

  const msg = {
    to,
    from: 'nightowler.pj@gmail.com',
    subject,
    html: body,
  };

  try {
    console.log('Sending email:', msg);
    await sgMail.send(msg);
    console.log('Email sent');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
}
