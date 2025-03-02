var channelsController = require('../controller/channels');
var express = require('express');
var middleware = require("../middleware/middleware");
var router = express.Router();
router.post('/new/channels', channelsController.createChannels);
router.get('/get/channels/all', channelsController.readAllChannels);
router.get('/get/channels/:idChannel', channelsController.readOneChannels);
router.delete('/delete/channels/:idChannel', channelsController.deleteOneChannels);
router.put('/put/channels/:idChannel', channelsController.updateOneChannels);
module.exports = router;
