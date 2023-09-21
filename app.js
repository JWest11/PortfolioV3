const nodemailer = require("nodemailer");
const SendingEmailAccount = "jwest11contact@gmail.com";
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SendingEmailAccount,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(messageBody, messageContact, messageSubject) {
    const info = await transporter.sendMail({
        from: SendingEmailAccount,
        to: "JoeyWest1414@gmail.com",
        subject: "Portfolio Contact From " + messageContact,
        text: messageSubject + "\n" + messageContact + "\n" + messageBody,
    });
    console.log("message sent", info.messageId);
}


const express = require("express");
const app = express();
const port = 3010;

app.use(express.static("client"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.post("/email", (req, res) => {
    console.log(req.body);
    const message = req.body.emailmessage;
    const contact = req.body.emailcontact;
    const subject = req.body.emailsubject;
    if (message && contact && subject) {
        res.statusCode = 200;
        sendEmail(message, contact, subject);
        res.send("Email sent successfully");
    } else {
        res.statusCode = 400;
        res.send("Bad request");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});