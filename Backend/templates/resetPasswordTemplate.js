exports.resetPasswordEmail = (resetUrl) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Reset Your Password</title>
        <style>
            body {
                background-color: #f9f9f9;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
    
            .header {
                font-size: 24px;
                font-weight: bold;
                color: #2563EB;
                margin-bottom: 15px;
            }
    
            .body {
                font-size: 16px;
                color: #555;
                margin-bottom: 20px;
            }
    
            .footer {
                font-size: 14px;
                color: #777;
                margin-top: 20px;
            }
    
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #2563EB;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 15px;
            }
    
            .button:hover {
                background-color: #0853f7;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">🔒 Reset Your Password</div>
            <div class="body">
                <p>We received a request to reset your password.</p>
                <p>If you made this request, please click the button below to set a new password:</p>
                <a class="button" href="${resetUrl}">Reset Password</a>
                <p>Or, you can copy and paste this link into your browser:</p>
                <p><strong>${resetUrl}</strong></p>
                <p>If you didn't request a password reset, you can ignore this email.</p>
            </div>
            <div class="footer">
                <p>Stay secure,</p>
                <p>- The NoteFlow Team</p>
            </div>
        </div>
    </body>
    
    </html>`;
};
