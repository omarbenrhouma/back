const express = require('express');
const ProjectController = require('../controllers/project.controller');
const router = express.Router();

const projectController = new ProjectController();

router.post('/', projectController.create.bind(projectController));
router.get('/:id', projectController.getById.bind(projectController));
router.put('/:id', projectController.update.bind(projectController));
router.delete('/:idmission/:id', projectController.delete.bind(projectController));

module.exports = router;
