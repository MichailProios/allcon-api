const asyncHandler = require("../utilities/asyncHandler/asyncHandler");
const errorResponse = require("../utilities/errorResponse/errorResponse.js");
const path = require("path");
const fs = require("fs-extra");
const url = require("url");

const getFileList = asyncHandler(async (req, res, next) => {
  const fileList = {};

  try {
    var request = url.parse(req.url, true);

    var action = request.pathname.replace(/^\/[\w\d]+\//, "");

    var filePath = path
      .join("/Websites/Pictures", action)
      .split("%20")
      .join(" ");

    console.log(filePath);

    const exists = !!(await fs.promises.stat(filePath).catch(() => null));

    if (!exists) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("404 Not Found");
      return;
    } else {
      const files = await fs.readdir(filePath);

      for (const file of files) {
        console.log(path.extname(file));
        if (path.extname(file) !== ".db") {
          fileList[file] =
            "https://allconcontracting.com:2096/files/getFile/" +
            action +
            "/" +
            file;
        }
      }

      return res.status(200).json(fileList);
    }
  } catch (error) {
    return next(new errorResponse(error.message, 500));
  }
});

const getFile = asyncHandler(async (req, res, next) => {
  try {
    // Parsing the URL
    var request = url.parse(req.url, true);

    var action = request.pathname.replace(/^\/[\w\d]+\//, "");
    // // Path Refinements
    var filePath = path
      .join("/Websites/Pictures", action)
      .split("%20")
      .join(" ");

    const exists = !!(await fs.promises.stat(filePath).catch(() => null));

    if (!exists) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("404 Not Found");
      return;
    } else {
      var ext = path.extname(action).toLowerCase();

      var contentType = "text/plain";

      switch (ext) {
        case ".png":
          contentType = "image/png";
          break;
        case ".jpg":
          contentType = "image/jpg";
          break;
        case ".JPG":
          contentType = "image/jpg";
          break;
        default:
          break;
      }

      res.writeHead(200, {
        "Content-Type": contentType,
      });

      fs.readFile(filePath, function (err, content) {
        res.end(content);
      });
    }
    // return res.status(200).json({ test: "test" });
  } catch (error) {
    return next(new errorResponse(error.message, 500));
  }
});

module.exports = {
  getFileList,
  getFile,
};
