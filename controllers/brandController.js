const { Brand } = require('../models/models');

class BrandController {
    async create(req, res) {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    }

    async getAll(req, res) {
      const brands = await Brand.findAll();
      res.json(brands);
    }

    async deleteOne(req, res) {
      const {id} = req.params;
      await Brand.destroy({ where: { id }});
      res.json({message: 'ok'}) ;
    }
}

module.exports = new BrandController();
