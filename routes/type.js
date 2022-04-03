const Router = require('express')
const router = Router()
const TypeController = require('../controllers/typeController')
const checkRole = require('../middleware/chekRole')

router.post('/' ,checkRole('ADMIN'), TypeController.create)
router.get('/' , TypeController.getAll)
router.delete('/:id', TypeController.deleteOne)

module.exports = router