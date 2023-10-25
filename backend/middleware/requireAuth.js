import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

const requireAuth = async (req, res, next) => {
    //verify if authenticated
    const { authorization } = req.headers
    if(!authorization) {
        return res.status(401).json({error: 'Authorization required!'})
    }
    //create a variable container to hold the authorization object
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.jwt_CODE)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error: 'Access Denied!'})
    }
}
export default requireAuth;