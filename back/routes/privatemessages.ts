const privateMessagesController = require('../controller/privatemessages')

let express = require('express')
const middleware = require("../middleware/middleware")
const router = express.Router()

router.post('/new/pvmessages', privateMessagesController.createPVMessages )
router.get('/get/pvmessages/all', privateMessagesController.readAllPVMessages )
router.get('/get/pvmessages/:idPVMsg', privateMessagesController.readOnePVMessages )
router.delete('/delete/pvmessages/:idPVMsg', privateMessagesController.deleteOnePVMessages )
router.put('/put/pvmessages/:idPVMsg', privateMessagesController.updateOnePVMessages )





module.exports = router



