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
  <div style="width: 100%">
    <h3>Allcon Contracting Website Inquiry </h3>
    <hr />
  </div>
  <div style="width: 100%">
    <p>Sender Name: <span style="font-weight: 600">${firstName} ${lastName}</span></p>
    <p>Sender Email: <span style="font-weight: 600">${email}</span></p>
    <p>Sender Phone Number: <span style="font-weight: 600">${phoneNumber}</span></p>
    <p>Sender Address: <span style="font-weight: 600">${addressLine}, ${city}, ${zip}, ${state}</span></p>
    <p>Inquiry: <span style="font-weight: 600">${inquiry}</span></p>
  </div>`;

    let info = await transporter.sendMail(
      {
        from: "inquiries@allconcontracting.com",
        to: "info@allconcontracting.com",
        bcc: "michaelp@allconcontracting.com",
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
