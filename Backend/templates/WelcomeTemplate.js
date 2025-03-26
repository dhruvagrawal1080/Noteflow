exports.welcomeEmail = (firstName, lastName, email) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Welcome to NoteFlow</title>
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
            <div class="header">🎉 Welcome to NoteFlow! 🎉</div>
            <div class="body">
                <p>Dear ${firstName} ${lastName},</p>
                <p>Congratulations! You have successfully joined <strong>NoteFlow</strong>.</p>
                <p>Start organizing your notes efficiently and collaborate with others seamlessly.</p>
                <p>Your registered email: <strong>${email}</strong></p>
                <p>Click the button below to explore your dashboard:</p>
                <a class="button" href="${process.env.FRONTEND_URL}">Go to Dashboard</a>
            </div>
            <div class="footer">
                <p>Happy Note-Taking! ✍️</p>
                <p>- The NoteFlow Team</p>
            </div>
        </div>
    </body>
    
    </html>`;
};
