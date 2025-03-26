const { contactUsEmail } = require("../templates/contactTemplate")
const { newMessageEmail } = require("../templates/newMessageEmailTemplate")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
    try {
        const { email, firstname, lastname, message, phoneNo, countrycode } = req.body

        await mailSender(
            email,
            "✅ Your Data Sent Successfully",
            contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
        )

        await mailSender(
            'dhruvagrawal1080@gmail.com',
            "📩 You Have a New Message",
            newMessageEmail(firstname, lastname, email, phoneNo, countrycode, message)
        )

        return res.json({
            success: true,
            message: "Email sent successfully",
        })
    }
    catch (err) {
        return res.json({
            success: false,
            message: "Something went wrong...",
            error: err.message
        })
    }
}