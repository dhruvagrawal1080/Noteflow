exports.otpEmail = (otp) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification</title>
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
    
            .otp-box {
                display: inline-block;
                padding: 10px 20px;
                font-size: 18px;
                font-weight: bold;
                color: #2563EB;
                background-color: #f1f5ff;
                border-radius: 5px;
                margin: 15px 0;
            }
    
            .footer {
                font-size: 14px;
                color: #777;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">🔐 OTP Sent Successfully</div>
            <div class="body">
                <p>Your One-Time Password (OTP) is:</p>
                <div class="otp-box">${otp}</div>
                <p>Please enter this OTP to complete your verification.</p>
                <p>This OTP is valid for a limited time.</p>
            </div>
            <div class="footer">
                <p>Stay secure,</p>
                <p>- The NoteFlow Team</p>
            </div>
        </div>
    </body>
    
    </html>`;
};
