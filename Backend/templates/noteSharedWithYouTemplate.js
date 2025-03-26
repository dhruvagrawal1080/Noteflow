exports.noteSharedEmail = (recipientFirstName, recipientLastName, senderFirstName, senderLastName, noteTitle, noteContent, noteLink) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Note Shared With You</title>
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

            .note-details {
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
                background-color: #2563EB;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
            }

            .button:hover {
                background-color: #0853f7;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">📌 A Note Has Been Shared With You</div>
            <div class="body">
                <p>Dear ${recipientFirstName} ${recipientLastName},</p>
                <p><strong>${senderFirstName} ${senderLastName}</strong> has shared a note with you!</p>
                <div class="note-details">
                    <p><strong>Title:</strong> ${noteTitle}</p>
                    <p><strong>Content Preview:</strong> ${noteContent.slice(0, 100)}...</p>
                </div>
                <p>Click the button below to view the full note:</p>
                <a href="${noteLink}" class="button">View Note</a>
            </div>
            <div class="footer">
                <p>Best Regards,</p>
                <p>- The NoteFlow Team</p>
            </div>
        </div>
    </body>
    
    </html>`;
};
