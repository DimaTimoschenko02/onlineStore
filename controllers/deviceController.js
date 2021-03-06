const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class DeviceController {
    async create(req , res , next){
      try {
        const { name, price, brandId, typeId, info}  = req.body;
        const { img } = req.files;
        let fileName = `${uuid.v4()}.jpg`;
        img.mv(path.resolve(__dirname, '..' , 'static', fileName));
        const device = await Device.create({ name, price, brandId, typeId, img: fileName });

        if(info) {
            // TODO: ищи ошибку Вася
          info = JSON.parse(info)
          info.forEach(e => {
            DeviceInfo.create({
              title: e.title,
              description: e.description,
              deviceId: device.id
              });
          });
        }

        res.json(device)
      }
      catch(e) {
        next(ApiError.badRequest(e.message));
      }
    }
    async getAll(req, res) {
      let devices;
      let {brandId , typeId , limit , page} = req.query;
      limit = limit || 100;
      page = page || 1;
      let offset = page * limit - limit;
      // TODO: думай как исправить, так не годиться
      if(!brandId && !typeId) {
        devices = await Device.findAndCountAll({limit , offset});
      }
      if(brandId && !typeId) {
        devices = await Device.findAll({ where: { brandId }, limit, offset });
      }
      if(!brandId && typeId) {
        devices = await Device.findAll({ where: { typeId }, limit, offset });
      }
      if(brandId && typeId) {
        devices = await Device.findAll({where: { brandId, typeId }, limit, offset});
      }

      return res.json(devices);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        });
        res.json(device);
    }
    async deleteOne(req, res) {
        const {id} = req.params;
        await Device.destroy({ where: { id } });
        res.json({message:'ok'});
    }

}

module.exports = new DeviceController();
