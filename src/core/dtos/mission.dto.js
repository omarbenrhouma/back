class CreateMissionDto {
    constructor(name, nbdejour, debut,fin,budget,validateur,Projects) {
      this.name = name;
      this.nbdejour = nbdejour;
      this.debut = debut;
      this.fin = fin;
      this.budget = budget;   
      this.validateur=validateur;
    }
  }
  
  class UpdateMissionDto {
    constructor(name, nbdejour, debut,fin,budget,validateur,Projects) {
        this.name = name;
        this.nbdejour = nbdejour;
        this.debut = debut;
        this.fin = fin;
        this.budget = budget;   
        this.validateur=validateur;
        this.Projects=Projects; 
      }
  }
  
  module.exports = {
    CreateMissionDto,
    UpdateMissionDto
  };
  