const Project = require('../entities/project.entity');

class ProjectRepository {
    
  async create(project) {
    return await Project.create(project);
  }
  async findProjectsid(Projects) {
    return await Project.find({ _id: { $in: Projects } });
 
   }
  
  async findById(id) {
    return await Project.findById(id);
  }

  async update(id, project) {
    return await Project.findByIdAndUpdate(id, project, { new: true });
  }

  async delete(id) {
    return await Project.findByIdAndDelete(id);
  }
}

module.exports = ProjectRepository;
