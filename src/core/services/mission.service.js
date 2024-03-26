const { CreateMissionDto, UpdateMissionDto } = require('../dtos/mission.dto');
const MissionRepository = require('../repositories/mission.repository');

const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require("jsonwebtoken");

class MissionService {
  constructor() {
    this.missionRepository = new MissionRepository();
  }

  async addto(idmission,idproject){
    return await this.missionRepository.addto(idmission,idproject);
  }
  async removeto(idmission,idproject){
    return await this.missionRepository.removeto(idmission,idproject);
  } 
  async create(createMissionDto) {
    const mission = {
      name: createMissionDto.name,
      nbdejour: createMissionDto.nbdejour,
      debut: createMissionDto.debut,
      fin: createMissionDto.fin,
      budget: createMissionDto.budget,
      validateur: createMissionDto.validateur
        };

    return await this.missionRepository.create(mission);
  }
  
  async getById(id) {
    const mission = await this.missionRepository.findById(id);
    if (!mission) {
      throw new Error('Mission not found');
    }

    return mission;
  }
  async getall() {
    const mission = await this.missionRepository.find();
    if (!mission) {
      throw new Error('Mission not found');
    }

    return mission;
  }

  async update(id, updateMissionDto) {
    const mission = await this.missionRepository.findById(id);


    mission.name = updateMissionDto.name;
    mission.fin = updateMissionDto.fin;
    mission.debut = updateMissionDto.debut;
    mission.nbdejour = updateMissionDto.nbdejour;
    mission.validateur = updateMissionDto.validateur;
    mission.budget = updateMissionDto.budget;



    return await this.missionRepository.update(id, mission);
  }

  async delete(id) {
    const mission = await this.missionRepository.findById(id);
    if (!mission) {
      throw new Error('Mission not found');
    }

    return await this.missionRepository.delete(id);
  }
}

module.exports = MissionService;
