import sgMail from '@sendgrid/mail'



const sendEmail = async ({ to, subject, text, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    from : 'kobbyokai18@gmail.com',
    to,
    subject,
    text,
    html
  }

  const info = await sgMail.send(msg)
};

export default sendEmail;
