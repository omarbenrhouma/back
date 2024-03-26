const { CreateProjectDto, UpdateProjectDto } = require('../dtos/project.dto');
const ProjectRepository = require('../repositories/project.repository');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const fs = require('fs');

class ProjectService {
  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async create(createProjectDto) {

    const project = {
      name: createProjectDto.name,
      fin : createProjectDto.fin,
      debut : createProjectDto.debut,
      details: createProjectDto.details,
      filename:createProjectDto.filename
    };

    return await this.projectRepository.create(project);
  }
  
  async getById(id) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  }

  async update(id, updateProjectDto) {
    const project = await this.projectRepository.findById(id);
    

    project.name = updateProjectDto.name;
    project.fin = updateProjectDto.fin;
    project.debut = updateProjectDto.debut;
    project.details = updateProjectDto.details;


    
    return await this.projectRepository.update(id, project);
  }

  async delete(id) {
    const project = await this.projectRepository.findById(id);
    const projectname = project.filename ;
    const filePath = '../src/uploads/'+projectname;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
      
        console.log('File deleted successfully');
      });
    if (!project) {
      throw new Error('Project not found');
    }

    return await this.projectRepository.delete(id);
  }
}

module.exports = ProjectService;
