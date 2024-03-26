const UserService = require('../services/user.service');
const { CreateUserDto, UpdateUserDto } = require('../dtos/user.dto');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async create(req, res) {
    try {
      const createUserDto = new CreateUserDto(
        req.body.email,
        req.body.password,
        req.body.name,
        req.body.mission
      );
      const user = await this.userService.create(createUserDto);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const user = await this.userService.login(req.body.email, req.body.password);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
    const user = await this.userService.getById(req.params.id);
    res.status(200).json(user);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
    }
    async update(req, res) {
      try {
      const updateUserData = new UpdateUserDto(
      req.body.email,
      req.body.password,
      req.body.name
      );
      const user = await this.userService.update(req.params.id, updateUserData);
      res.status(200).json(user);
      } catch (err) {
      res.status(400).json({ error: err.message });
      }
      } 
      async delete(req, res) {
      try {
      const user = await this.userService.delete(req.params.id);
      res.status(200).json(user);
      } catch (err) {
      res.status(400).json({ error: err.message });
      }
      }
      }
      
      module.exports = UserController;
