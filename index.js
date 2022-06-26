//Main Dependancies
/*****************************************************************************************************************************/
const express = require("express");
const listEndpoints = require("express-list-endpoints");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const pjson = require("./package.json");
/*****************************************************************************************************************************/

//https
/*****************************************************************************************************************************/
const fs = require("fs");
const https = require("https");
/*****************************************************************************************************************************/

//Routes
/*****************************************************************************************************************************/
const emailRoutes = require("./routes/emailRoutes");
const fileRoutes = require("./routes/fileRoutes");
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
app.use(helmet());
//app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
/*****************************************************************************************************************************/

//Endpoints
/*****************************************************************************************************************************/
app.get("/", (req, res) => {
  res.send(
    pjson.description + " v" + pjson.version + "<br/> <br/>" + new Date()
  );
});

app.get("/endpoints", function (req, res) {
  res.send(listEndpoints(app));
});

app.use("/api", emailRoutes);
app.use("/files", fileRoutes);
/*****************************************************************************************************************************/

//Server
/*****************************************************************************************************************************/
const httpsOptions = {
  key: fs.readFileSync("D:/Websites/allcon-api/security/key.pem"),
  cert: fs.readFileSync("D:/Websites/allcon-api/security/cert.pem"),
};

const serverHttps = https.createServer(httpsOptions, app).listen(2096, () => {
  console.log("HTTPS server listening on port " + 2096);
});
/*****************************************************************************************************************************/
