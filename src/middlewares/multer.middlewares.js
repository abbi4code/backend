//this can use in any projects you wnat

import multer from "multer";


//storing on the server cb=callback
//in function (file) is there is just to cheack whether the code have some file to upload something on cloud

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage, })