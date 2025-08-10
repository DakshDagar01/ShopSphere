import {Router} from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { 
    addToCart, 
    getCart, 
    isLoggedIn, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    removeFromCart 
} from "../controllers/userController.js"

const router=Router()

router.route('/register').post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/isLoggedIn").get(verifyJWT,isLoggedIn)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/addToCart").post(verifyJWT,addToCart)
router.route("/removeFromCart").delete(verifyJWT,removeFromCart)
router.route("/get-cart").get(verifyJWT,getCart)
export default router