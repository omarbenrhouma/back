const Mission = require('../entities/mission.entity');
const Project = require('../entities/project.entity');

class MissionRepository {
    
  async create(mission) {
    return await Mission.create(mission);
  }
  async addto(idmission,idproject){
    return await Mission.updateOne({_id:idmission},{ $push: {Projects:idproject} })
  }
  async removeto(idmission,idproject){
    return await Mission.updateOne({_id:idmission},{ $pull: {Projects:idproject} })
  }
  async findById(id) {
    return await Mission.findById(id).populate('Projects');
  }
  async find() {
    return await Mission.find();
  }
  async update(id, mission) {
    return await Mission.findByIdAndUpdate(id, mission, { new: true });
  }

  async delete(id) {
    return await Mission.findByIdAndDelete(id);
  }
}

module.exports = MissionRepository;
