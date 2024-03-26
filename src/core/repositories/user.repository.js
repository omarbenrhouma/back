const User = require('../entities/user.entity');
const Mission = require('../entities/mission.entity');
const Project = require('../entities/project.entity');

class UserRepository {
  async create(user) {
    return await User.create(user);
  }

  async findByEmail(email) {
    return await User.findOne({
    email: email
  });
  }
  async removeto(iduser,idmission){
    return await User.updateOne({_id:iduser},{ $pull: {mission:idmission} })
  }
    async addto(iduser,idmission){
    return await User.updateOne({_id:iduser},{ $push: {mission:idmission} })
  }
  async findById(id) {    
    return await User.findById(id).populate('mission');
  }

  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;
