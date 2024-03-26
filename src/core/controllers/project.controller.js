const ProjectService = require('../services/project.service');
const { CreateProjectDto, UpdateProjectDto } = require('../dtos/project.dto');
const MissionService = require('../services/mission.service');
const multer = require('multer');

class ProjectController {
  constructor() {
    this.projectService = new ProjectService();
    this.missionService = new MissionService();

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      }
    });

    this.upload = multer({ storage: storage ,fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(xlsx|xls)$/)) {
        return cb(new Error('Please upload an Excel file'));
      }
      cb(null, true);
    }});
  }
     
  async create(req, res) {
    try {
      this.upload.single('file')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const createProjectDto = new CreateProjectDto(
          req.body.name,
          req.body.debut,
          req.body.fin,
          req.body.details,
          req.file.filename  
        );

        const project = await this.projectService.create(createProjectDto);

        await this.missionService.addto(req.body.idmission, project._id);

        res.status(201).json(project);
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


  async getById(req, res) {
    try {
    const project = await this.projectService.getById(req.params.id);
    res.status(200).json(project);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
    }
    async update(req, res) {
      try {
      const updateProjectData = new UpdateProjectDto(
        req.body.name,
        req.body.debut,
        req.body.fin,
        req.body.details
      );
      const project = await this.projectService.update(req.params.id, updateProjectData);
      res.status(200).json(project);
      } catch (err) {
      res.status(400).json({ error: err.message });
      }
      } 

      async delete(req, res) {
      try {      
      const deleteproject = await this.projectService.delete(req.params.id);
      await this.missionService.removeto(req.params.idmission, req.params.id);
      res.status(200).json(deleteproject);
      } catch (err) {
      res.status(400).json({ error: err.message });
      }
      }
      }
      
      module.exports = ProjectController;
