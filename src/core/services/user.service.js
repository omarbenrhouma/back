const { CreateUserDto, UpdateUserDto } = require('../dtos/user.dto');
const UserRepository = require('../repositories/user.repository');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async removeto(iduser,idmission){
    return await this.userRepository.removeto(iduser,idmission);
  }
  async addto(iduser,idmission){
    return await this.userRepository.addto(iduser,idmission);
  }
  async create(createUserDto) {
    const emailExists = await this.userRepository.findByEmail(
      createUserDto.email
    );

    if (emailExists) {
      throw new Error('Email is already taken');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = {
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name,
      mission:createUserDto.mission
    };

    return await this.userRepository.create(user);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password is incorrect');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Email or password is incorrect');
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      token: this.generateToken(user)
    };
  }

  generateToken(user) {

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      process.env.SECRET_KEY,
      { expiresIn: '30d' }
    );

    return token;
  }
  
  async getById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id, updateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.email = updateUserDto.email;
    user.name = updateUserDto.name;

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    return await this.userRepository.update(id, user);
  }

  async delete(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.userRepository.delete(id);
  }
}

module.exports = UserService;
