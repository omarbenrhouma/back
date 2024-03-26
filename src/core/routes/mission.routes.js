const express = require('express');
const MissionController = require('../controllers/mission.controller');
const router = express.Router();

const missionController = new MissionController();

router.post('/', missionController.create.bind(missionController));
router.get('/:id', missionController.getById.bind(missionController));
router.put('/:id', missionController.update.bind(missionController));
router.get('/:id', missionController.getall.bind(missionController));
router.delete('/:iduser/:id', missionController.delete.bind(missionController));

module.exports = router;
