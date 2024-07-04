interface VercelInviteUserEmailProps {
  invitedByEmail: string;
  invitedByName: string;
  invitedByPassword: string;
  type?: string;
}

export const passwordSetEmail = ({
  invitedByEmail,
  invitedByName,
  invitedByPassword,
  type,
}: VercelInviteUserEmailProps) => {
  const url = `email=${invitedByEmail}&password=${invitedByPassword}&name=${invitedByName}`;
  let previewText;
  let inviteLink = `http://localhost:3000`;
  let header;
  let btn;
  let description;
  if (type === "setPassword") {
    inviteLink += `/setpassword?${url}&type=setPassword`;
    previewText = "Set your password";
    header = `Join <strong>${invitedByName}</strong> on <strong>Digio Stock</strong>`;
    btn = "SET CLICK HERE";
    description = `This invitation was intended for <span className="text-black">${invitedByName}</span> If you were not
        expecting this invitation, you can ignore this email. If you are
        concerned about your account's safety, please reply to this email to get
        in touch with us.
     `;
  } else {
    inviteLink += `/setpassword?${url}&type=forgotPassword`;
    previewText = "Reset your password";
    header = `Reset your password on <strong>Digio Stock</strong>`;

    btn = "RESET CLICK HERE";
    description = ` This email was sent to <span className="text-black">${invitedByEmail}</span> because you
        requested a password reset. If you did not request this, please ignore
        this email.`;
  }

  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Set Email</title>
  <style>
    .container {
      border: 1px solid #eaeaea;
      border-radius: 5px;
      margin: 40px auto;
      padding: 20px;
      max-width: 465px;
    }
    .text {
      color: #000;
      font-size: 14px;
      line-height: 24px;
      align-items: center;
    }
    .button {
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #1a73e8;
      font-size: 12px;
      font-weight: bold;
      text-decoration: none;
      padding: 10px 20px;
      display: inline-block;
      margin: 20px 0;
    }
    .hr {
      border: 1px solid #eaeaea;
      margin: 26px 0;
      width: 100%;
    }
    .footer-text {
      color: #666;
      font-size: 12px;
      line-height: 24px;
    }
    .text-black {
      color: #000;
    }
    .email {
      color: #1a73e8;
      text-decoration: underline;
      text-align: center;
      margin-top: 0;
      margin-bottom: 0;
    }
    .text-blue-header {
      color: #1a73e8;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 16px;
      margin-bottom: 8px;
      text-align: center;
    }
      .heading {
      color: #000;
      font-size: 20px;
      font-weight: medium;
      text-align: center;
      margin-top: 0;
      margin-bottom: 0;
    }
  </style>
</head>
<body style="background-color: white; font-family: sans-serif; padding: 20px;">
  <div class="container">
    <img
      src="https://static.wixstatic.com/media/59c690_63b573c211fd44ec89b0103477bfc986~mv2.png/v1/fill/w_87,h_53,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/digio_logo.png"
      alt="Plaid"
      style="display: block; margin: 0 auto;"
    />
    <p class="text-blue-header">
     ${header}
    </p>
    <h1 class="heading">Hello ${invitedByName}</h1>
    <h2 href="mailto:${invitedByEmail}" class="email">
        ${invitedByEmail}
    </h2>
    <div style="text-align: center">
      <a href="${inviteLink}" class="button">${btn}</a>
    </div>
    <hr class="hr" />
    <p class="footer-text">
      ${description}
    </p>
  </div>
</body>
</html>`;
};
