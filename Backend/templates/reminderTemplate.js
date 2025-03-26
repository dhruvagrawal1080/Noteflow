exports.reminderEmail = (title, description) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Reminder Notification</title>
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

            .reminder-box {
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

            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #2563EB;
                border-radius: 5px;
                text-decoration: none;
                margin-top: 15px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">⏰ Reminder: ${title}</div>
            <div class="body">
                <p>Hey there,</p>
                <p>Just a quick reminder for you:</p>
                <div class="reminder-box">
                    <p><strong>Don't forget:</strong> ${description}</p>
                </div>
                <p>Stay on top of your tasks! 😊</p>
            </div>
            <div class="footer">
                <p>Best Regards,</p>
                <p>- The NoteFlow Team</p>
            </div>
        </div>
    </body>
    
    </html>`;
};
