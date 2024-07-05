interface PlaidVerifyIdentityEmailProps {
  validationCode: string;
  referenceNumber: string;
}

export const PlaidVerifyIdentityEmail = ({
  validationCode,
  referenceNumber,
}: PlaidVerifyIdentityEmailProps) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Identity</title>
  <style>
    body {
      background-color: white;
      font-family: sans-serif;
      padding: 20px;
    }
    .container {
      border: 1px solid #eaeaea;
      border-radius: 5px;
      margin: 40px auto;
      padding: 20px;
      max-width: 465px;
    }
    .img {
      display: block;
      margin: 0 auto;
      width: 270px;
      height: 150px;
    }
    .text-blue {
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
    .section {
      background-color: #f7fafc;
      border: 1px solid #1a73e8;
      border-radius: 5px;
      margin: 16px auto;
      width: 70%;
      text-align: center;
    }
    .code {
      color: #1a73e8;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: wider;
      line-height: 40px;
      padding: 8px 0;
      margin: 0 auto;
    }
    .reference {
      color: #4a5568;
      font-size: 16px;
      text-align: center;
       margin-top: 0;
      margin-bottom: 0;
    }
    .timer {
      color: #4a5568;
      font-size: 12px;
      text-align: center;
       margin-top: 0;
      margin-bottom: 0;
    }
    .highlight {
      color: #1a73e8;
      font-size: 20px;
      text-align: center;
       margin-top: 0;
      margin-bottom: 0;
      font-weight: bold;
    }
      .footer-text {
      color: #666;
      font-size: 12px;
      line-height: 24px;
    }
  </style>
</head>
<body>
  <div class="container">
    <img
      src = "cid:digio_logo"  
      alt="Digio Stock"
      class="img"
    />
    <p class="text-blue">Verify Your Identity</p>
    <h1 class="heading">Enter the following code to finish.</h1>
    <div class="section">
      <p class="code">${validationCode}</p>
    </div>
    <div>
      <p class="reference">Reference Number: ${referenceNumber}</p>
      <p class="timer">Enter the code above within</p>
      <p class="highlight">30 Seconds</p>
    </div>
     <hr class="hr" />
     <p class="footer-text">
        If you did not request this code, please ignore this email.
    </p>
  </div>
</body>
</html>
`;
