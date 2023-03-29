import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next) =>{
    try {
        const token = req.cookies.access_token;
        if(!token) return res.status(400).json({status:false, message:"you are not authorized"});

        jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
            if(err) return res.status(400).json({status:false, message:err});
            console.log(user)
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(400).json({status:false, message:"error in token verification"});
    }

}

export const verifyUser = async(req,res,next) => { 
    try {
        if(req.user.role === 0 || req.user.role === 1){
            next();
        }else{
            res.status(400).json({status:false, message:"error in role verification"});
        }
    } catch (error) {
        res.status(400).json({status:false, message:"error in user verification"});
    }
}
