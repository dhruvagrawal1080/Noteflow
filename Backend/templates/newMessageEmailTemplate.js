exports.newMessageEmail = (firstname, lastname, email, phoneNo, countrycode, message) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>New Message Notification</title>
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
                text-align: left;
            }

            .details {
                background-color: #f1f5ff;
                padding: 15px;
                border-radius: 5px;
                text-align: left;
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
            <div class="header">📩 You Have a New Message</div>
            <div class="body">
                <p>Hello,</p>
                <p>You have received a new message from your website contact form. Here are the details:</p>
                <div class="details">
                    <p><strong>From:</strong> ${firstname} ${lastname}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone Number:</strong> ${countrycode} ${phoneNo}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </div>
                <p>Please respond as soon as possible.</p>
            </div>
            <div class="footer">
                <p>Best Regards,</p>
                <p>- The NoteFlow Team</p>
            </div>
        </div>
    </body>
    
    </html>`;
};
