const ApiError = require('../error/ApiError');
const {User, Basket} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email ,role) => {
    return jwt.sign(
      { id: id , email , role },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    )
};

class UserController {
    async registration(req , res , next){
      const { email, password , role} = req.body;

      if(!email || !password) {
        return next(ApiError.badRequest('uncorrect input'));
      }

      const tempUser = await User.findOne({ where: { email } });

      if(tempUser) {
        const ret = await User.findAll();
        console.log(ret);
        return next(ApiError.badRequest('this email is already in use'));
      }

      try {
        const hashPass = await bcrypt.hash(password, 5);
        const user = await User.create({email, role , password: hashPass});
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
      } catch(e) {
        console.log(e);
      }
    }

    async login(req , res , next){
      const {email , password} = req.body
      const user = await User.findOne({where:{email}})

      if(!user){
        return next(ApiError.badRequest('no user with this email'))
      }
      let isValid = bcrypt.compareSync(password , user.password)
      if(!isValid) {
        return next(ApiError.badRequest('incorrect password'));
      }
      const token = generateJwt(user.id,user.email,user.role);

      return res.json({token});
    }

    async getAll(req, res){
      const users = await User.findAll();
      res.json({ users });
    }

    async check(req, res) {
      const token = generateJwt(req.user.id, req.user.email , req.user.role);
      return res.json({ token });
    }
}

module.exports = new UserController()