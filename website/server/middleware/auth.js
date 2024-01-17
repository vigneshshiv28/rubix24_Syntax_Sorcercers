import jwt from "jsonwebtoken";

const verifyToken =async(req,res,next)=>{
    try {
        let token = req.header("Authorization");

        if(!token){
            return res.status(401).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimStart();
        }
        console.log("in Verify token");
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export default verifyToken;