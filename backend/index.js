const AdmZip = require('adm-zip');
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const multer  = require('multer')
const passportSetup = require("./passport");
// const upLoadZipfile = require("../client/src/pages/UploadZipFile");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


// const upload = multer()
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, './images')
  },
  filename: (req, file, cb)=>{
    cb(null, Date.now() + '--' + file.originalname)
  }
})
const upload = multer({storage: fileStorageEngine});

app.post("/single", upload.single("image"),(req, res)=>{
  console.log(req.file);
  res.send("single file upload success")
});

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});
