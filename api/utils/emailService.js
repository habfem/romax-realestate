import postmark from "postmark";
import dotenv from "dotenv";
dotenv.config();
const client = new postmark.ServerClient(process.env.POSTMARK_KEY);

const sendConfirmationEmail = async (booking) => {
  const property =
    booking.product.type === "Estate" ? "Estate Property" : "House Property";
  const inspectionDate = booking.viewDate.toLocaleDateString();

  const htmlBody = `
      <html>
        <head>
          <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f7f7;
          }
          .header {
            background-color: #0070c0;
            color: #ffffff;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px;
          }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Property Inspection Confirmation</h1>
            </div>
            <div class="content">
              <p>Dear Valued Customer,</p>
              <p>Thank you for booking  a ${property} of ${booking.product.item.title}.</p>
              <p>We have confirmed the inspection date to be on the ${inspectionDate}. If this date is inconvenient for you, please feel free to contact us to reschedule to a more suitable date.</p>
              <p>We appreciate your choice in our services and look forward to assisting you!</p>
            </div>
          </div>
        </body>
      </html>
    `;

  await client.sendEmail({
    From: "sam@umweltdev.com",
    To: booking.email,
    Subject: "Property Inspection Confirmation",
    HtmlBody: htmlBody,
  });
};

const sendTokenEmail = async (link, user) => {
  const htmlBody = `
      <html>
        <head>
          <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f7f7;
          }
          .header {
            background-color: #0070c0;
            color: #ffffff;
            padding: 10px;
            text-align: center;
          }
          .content {
            padding: 20px;
          }
          </style>
        </head>
        <body>
          <div class="container">
            
            <div class="content">
              <p>Dear ${user.username},</p>
              <p>Click on the link below to reset your password.</p>
              <a style="
              margin: 0 auto;
              background-color: #2d4f93;
              font-size: 15px;
              text-decoration: none;
              padding: 15px 30px;
              color: white;
              display: inline-block;
              border-radius: 100px;
              font-weight: 600;
              font-family: 'Poppins';
              "
              href=${link}> Reset Password<a/>
            </div>
          </div>
        </body>
      </html>
    `;

  await client.sendEmail({
    From: "sam@umweltdev.com",
    To: user.email,
    Subject: "You Have Requested to Reset Your Password",
    HtmlBody: htmlBody,
  });
};

export { sendConfirmationEmail, sendTokenEmail };
