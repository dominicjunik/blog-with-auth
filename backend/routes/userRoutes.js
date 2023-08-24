const express = require('express')
const router = express.Router()
const userControl = require('../controllers/userController')

router.get('/', userControl.show)
router.get('/list', userControl.index)
router.put('/', userControl.update)

module.exports = router