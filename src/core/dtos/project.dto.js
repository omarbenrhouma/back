class CreateProjectDto {
    constructor(name,debut,fin,details,filename) {
      this.name = name;
      this.debut = debut;
      this.fin = fin;      
      this.details = details;
      this.filename =filename ;
    }
  }
  
  class UpdateProjectDto {
    constructor(name,debut,fin,details) {
        this.name = name;
        this.debut = debut;
        this.fin = fin;        
        this.details = details;
      }
  }
  
  module.exports = {
    CreateProjectDto,
    UpdateProjectDto
  };
  