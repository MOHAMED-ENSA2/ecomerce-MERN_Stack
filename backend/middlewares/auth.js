const jwt = require("jsonwebtoken")
const config =require("config")

const auth = (req, res, next) => {

    const token = req.header("x-auth-token")
    if(!token) 
        return  res.status(401).send("access denied!")

    try{
        const decode = jwt.verify( token , config.get("jwtPrivateKey"))
        req.user  = decode       
        next()
    }
    catch(ex){
        return res.status(400).send("invalid token")
    }

}

module.exports = auth