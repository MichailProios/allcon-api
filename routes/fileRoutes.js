const { Router } = require("express");
const { getFileList, getFile } = require("../controllers/fileControllers");
const router = Router();

router.get("/getFileList*", getFileList);

router.get("/getFile*", getFile);

module.exports = router;
