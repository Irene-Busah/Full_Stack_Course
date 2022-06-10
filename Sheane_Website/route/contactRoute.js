const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/contact", (req, res) => {
    let data = req.body;
    if (
        data.name.length === 0 || data.email.length === 0 || data.product.length === 0 || data.quantity.length){
            return res.json({msg: "Please Fill All The Fields!"});
        }
    let smtpTransporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        auth: {
            user: "",
            pass: ""
        }
    });
    let mailOptions = {
        from: data.email,
        to: "i.busah@alustudent.com",
        subject: `message from ${data.name}`,
        html: `
            <h3>Information</h3>
            <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${data.quantity}</p>
            <p>${data.product}</p>
        `,
    };

    smtpTransporter.sendMail(mailOptions, (error) => {
        try {
            if (error)
                return res.status(400).json({ msg: "Please Fill All The Fields!" });
        } catch (error) {
            if (error) return res.status(500).json({ msg: "There is server error" });
        }
    })
})
module.exports = router;