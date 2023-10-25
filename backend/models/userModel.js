import mongoose from 'mongoose';
import validator  from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
      email: {
        type: String, 
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
})
//static signup method for userController logic
userSchema.statics.signup = async function(email,password){
//install validator  in terminal check if valid email and strong password
//if email and password fields are empty
    if(!email || !password) {
        throw Error('all fields must be filled!')
    }
//if email is not a valid email
    if(!validator.isEmail(email)) {
        throw Error('email is not valid!')
    }
    //if password is not strong
    if(!validator.isStrongPassword(password)) {
        throw Error('strong password required!')
    }
    const exists = await this.findOne({ email })
    if(exists) {
        throw Error('email already in use')
    }
//if email doesnt exists then hash the password before saving
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //create a new user document
    const user = await this.create({email, password: hash})
    return user;
 };
 //static login method for userController logic
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('all fields must be filled!')
    }
    const user = await this.findOne({ email })
    if(!user){
        throw Error('incorrect email or password')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('incorrect email or password')
    }
    return user;
    
}

const User = mongoose.model('User', userSchema)
export default User;
