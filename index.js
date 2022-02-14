//Main Dependancies
/*****************************************************************************************************************************/
const express = require("express");
const listEndpoints = require("express-list-endpoints");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
/*****************************************************************************************************************************/

//https
/*****************************************************************************************************************************/
const fs = require("fs");
const https = require("https");
/*****************************************************************************************************************************/

//Routes
/*****************************************************************************************************************************/
const emailRoutes = require("./routes/emailRoutes");
/*****************************************************************************************************************************/

//Server Options
/*****************************************************************************************************************************/
const app = express();
// app.use(
//   compression({
//     filter: function () {
//       return true;
//     },
//   })
// );
//app.use(helmet());
// app.use(cookieParser());
app.use(express.json());
//app.use(cors({ origin: true, credentials: true }));
/*****************************************************************************************************************************/

//Endpoints
/*****************************************************************************************************************************/
app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.get("/endpoints", function (req, res) {
  res.send(listEndpoints(app));
});

app.use("/api", emailRoutes);
/*****************************************************************************************************************************/

//Server
/*****************************************************************************************************************************/
const httpsOptions = {
  key: fs.readFileSync("./security/key.pem"),
  cert: fs.readFileSync("./security/cert.pem"),
  //   passphrase: "test",
};

const serverHttps = https.createServer(httpsOptions, app).listen(8000, () => {
  console.log("HTTPS server listening on port " + 8000);
});
/*****************************************************************************************************************************/
