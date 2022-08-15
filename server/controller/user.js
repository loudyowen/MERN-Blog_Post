import userAccount from "../models/userAccount.js";

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signIn = async (req,res)=>{
    const {email, password, sub, name, picture} = req.body;

    try{
        const userExist = await userAccount.findOne({email});
        // check if sub exist in req.body, if exist then login for google user
        if(sub){
            // if google user not exist then create and continue login
            if(!userExist){
                const userData = await userAccount.create({name, email,image: picture,id: sub})
                const token = jwt.sign({email: userData.email, id: userData.id},'userCreationSecret',{expiresIn: "1h"})
                return res.status(200).json({userData, token})
            }
            const googleUser = await userAccount.findOne({email});
            const token = jwt.sign({email: googleUser.email, id: googleUser.id},'userCreationSecret',{expiresIn: "1h"})       
            return res.status(200).json({userData: googleUser, token})
        }
        if(!userExist) return res.status(404).json({message: "User not exist"})

        const passwordCheck = await bcrypt.compare(password, userExist.password);

        if(!passwordCheck) return res.status(400).json({message: "password incorrect"})
        const token = jwt.sign({email: userExist.email, id: userExist._id},'userCreationSecret',{expiresIn: "1h"})       
        res.status(200).json({userData: userExist, token})
    }catch(error){
        res.status(404).json({message: error.message})
    }
};


export const signUp = async (req,res)=>{
    const { email, firstName, lastName, password, confirmPassword, picture, sub, name } = req.body
    try{
        const userExist = await userAccount.findOne({email});
        if(userExist){return res.status(400).json({message: "User already exist"})}
        if(password !== confirmPassword){return res.status(400).json({message: "password doesn't match"})}
        const hashPassword = await bcrypt.hash(password, 12)
        const userData = await userAccount.create({name: `${firstName} ${lastName}`, password: hashPassword, email});
        const token = jwt.sign({email: userData.email, id: userData._id},'userCreationSecret',{expiresIn: "1h"})
        res.status(200).json({userData, token})
    }catch(error){
        res.status(404).json({message: error.message})
    }
};

