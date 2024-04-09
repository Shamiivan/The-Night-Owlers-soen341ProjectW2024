import nodemailer from 'nodemailer';
export async function sendEmail({to, name, subject, body}: {to: string, name: string, subject: string, body: string}){
    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
    const transporter = nodemailer.createTransport({
        service: 'gamail',
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    });
    try {
        const testResult = await transporter.verify();
        console.log('testResult', testResult);
    } catch (error) {
        console.error('Error verifying SMTP connection:', error);
        throw error;
    }

    try {
        const sendResult = await transporter.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body
        });
        console.log('Email sent:', sendResult.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
