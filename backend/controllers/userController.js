import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

//create a variable for token
const createToken = (_id) => {
    return jwt.sign({_id},process.env.jwt_CODE, {
        expiresIn: '2d'
    })
}

//login user
const loginUser = async (req, res) =>{
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    //res.json({mssg:'login user'})
};

//signup user
const signupUser = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.signup(email, password)
//create token after registering new account
        const token = createToken(user._id)
        res.status(200).json({ email, token})
    }catch(error){
        res.status(400).json({error: error.message}) 
    }
};

export { loginUser, signupUser };