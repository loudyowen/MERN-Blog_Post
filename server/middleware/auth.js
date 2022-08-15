import jwt, {decode} from 'jsonwebtoken'

const auth = async(req,res,next) => {
    console.log("auth is working")
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodeData;

        if(token){
            decodeData = jwt.verify(token, 'userCreationSecret')
            req.userId = decodeData?.id;
        }    
        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;