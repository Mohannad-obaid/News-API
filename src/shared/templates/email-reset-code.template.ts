export const resetPasswordTemplate = (userName: string, token: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border: 1px solid #dddddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #4CAF50;
      margin-bottom: 20px;
    }
    .divider {
      height: 2px;
      background-color: #4CAF50;
      margin: 20px 0;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
    }
    .reset-code {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      color: #4CAF50;
      margin: 20px 0;
    }
    .footer {
      font-size: 14px;
      color: #777777;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      PASSWORD RESET REQUEST
    </div>
    <div class="content">
      <p>Dear <strong>${userName}</strong>,</p>
      <p>We received a request to reset your password. Please find your reset code below:</p>
      <div class="reset-code">
        ${token}
      </div>
      <p>This code is valid for <strong>10 minutes</strong>.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    </div>
    <div class="divider"></div>
    <div class="footer">
      Thank you,<br>
      The [Your App Name] Team
    </div>
  </div>
</body>
</html>
`;
