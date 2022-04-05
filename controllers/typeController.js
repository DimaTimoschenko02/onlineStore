const { Type } = require('../models/models');

class TypeController {
    async create(req, res){
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.send(type);
    }

    async getAll(req , res){
      const types = await Type.findAll();
      return res.json(types);
    }

    async deleteOne(req, res){
      const { id } = req.params;
      await Type.destroy({ where: { id } });
      res.json({ message: 'ok' });
    }
}

module.exports = new TypeController();
