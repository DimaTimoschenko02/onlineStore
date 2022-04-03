const Router = require('express')
const userController = require('../controllers/userController')
const router = Router()
const UserController = require('../controllers/userController')
const authValid = require('../middleware/authToken')


router.post('/registration' , userController.registration)
router.post('/login' , userController.login)
router.get('/auth' ,authValid, userController.check )
router.get('/' , userController.getAll )
module.exports = router