class CreateUserDto {
  constructor(email, password, name,mission) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.mission=mission;
  }
}

class UpdateUserDto {
  constructor(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

module.exports = {
  CreateUserDto,
  UpdateUserDto
};
