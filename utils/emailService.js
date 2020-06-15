const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("email"),
    pass: config.get("emailPassword"),
  },
});

module.exports = sendEmailForResetPassword = (to, text, _id) => {
  const mailOptions = {
    from: config.get("email"),
    to: to,
    subject: "Account recovery.",
    text: text,
    html: `<a href='${config.get(
      "frontEndURL"
    )}/?id=${_id}'>Reset Password</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: ", info.response);
      return true;
    }
  });
};
module.exports = sendEmailVerificationCode = (to, code) => {
  const mailOptions = {
    from: config.get("email"),
    to: to,
    subject: "Please enter following code to verify your account",
    text: "enter " + code + " to verify your email",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: ", info.response);
      return true;
    }
  });
};

module.exports = sendNotification = (to, subject, content) => {
  const mailOptions = {
    from: config.get("email"),
    to: to,
    subject: subject,
    text: content,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: ", info.response);
      return true;
    }
  });
};
