const jwt = require('jsonwebtoken')

module.exports = function(role){
    return function(req,res,next){
        if(req.method === "OPTIONS"){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(401).json({message:'user is not authorized'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log("decoded - ",decoded)
            if(decoded.role !== role){
                res.status(401).json({message:'u dont have access'})
            }
            req.user = decoded
            next()
        }
        catch(e){
            res.status(401).json({message:'user is not authorized'})
        }
    }
}

 