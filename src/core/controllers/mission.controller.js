const MissionService = require('../services/mission.service');
const { CreateMissionDto, UpdateMissionDto } = require('../dtos/mission.dto');
const UserService = require('../services/user.service');
const ProjectService = require('../services/project.service');

class MissionController {
  constructor() {
    this.missionService = new MissionService();
    this.userService = new UserService();
    this.projectService = new ProjectService();
  }

  async create(req, res) {
    try {
      const createMissionDto = new CreateMissionDto(
        req.body.name,
        req.body.nbdejour,
        req.body.debut,
        req.body.fin,
        req.body.budget,
        req.body.validateur
      );
      const mission = await this.missionService.create(createMissionDto);
      await this.userService.addto(req.body.iduser, mission._id)
      res.status(201).json(mission);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const mission = await this.missionService.getById(req.params.id);
      res.status(200).json(mission);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async getall(req, res) {
    try {
      const mission = await this.missionService.getall();
      res.status(200).json(mission);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async update(req, res) {
    try {
      const updateMissionData = new UpdateMissionDto(
        req.body.name,
        req.body.nbdejour,
        req.body.debut,
        req.body.fin,
        req.body.budget,
        req.body.validateur,
        req.body.Projects
      );
      const mission = await this.missionService.update(req.params.id, updateMissionData);
      res.status(200).json(mission);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const mission = await this.missionService.getById(req.params.id);
  
      for (const missionId of mission.Projects) {
        await this.projectService.delete(missionId);
      }
  
      const deletei = await this.missionService.delete(req.params.id);
      await this.userService.removeto(req.params.iduser, req.params.id);
      res.status(200).json(deletei);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
}

module.exports = MissionController;
