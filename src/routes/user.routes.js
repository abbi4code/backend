import {Router} from "express"
import registerUser from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middlewares.js"

const router = Router()


router.route("/register").post(
    //as we gonna insert a middleware if somefeild req to store file such as img or avatar
    //upload.fields take arrays of objects
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },{
            name: "coverimage",
            maxCount: 1
        }

    ]),
    registerUser
    )
//router.route("./login").post(login)


export default router