const asyncHandler = require("../utilities/asyncHandler/asyncHandler");
const errorResponse = require("../utilities/errorResponse/errorResponse.js");
const nodemailer = require("nodemailer");
const moment = require("moment");

const post_ContactUsEmail = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    addressLine,
    city,
    zip,
    state,
    inquiry,
  } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "allconcontracting-com.mail.protection.outlook.com",
      port: 25,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const output = `
          `;

    let info = await transporter.sendMail(
      {
        from: email,
        to: "michaelp@allconcontracting.com",
        subject: `Allcon Contracting Website Inquiry`,
        html: output,
      },
      (error) => {
        if (!error) {
          return res.status(200).send("Email Sent Successfully");
        } else {
          return res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    return next(new errorResponse(error.message, 500));
  }
});

module.exports = {
  post_ContactUsEmail,
};
