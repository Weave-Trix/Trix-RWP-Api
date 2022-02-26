import jwt from 'jsonwebtoken';
const { verify } = jwt;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Invalid Token!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("Restricted Access! Not Authenticated!");
    }
}

const verifyTokenAuth = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.idAdmin) {
            next();
        } else {
            res.status(403).json("Restricted Access! Illegal Request");
        }
    })
}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Restricted Admin Access! Illegal Request");
        }
    })
}

const verifyTokenArtist = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.isArtist || req.user.isAdmin) {
            next();
            console.log("verified artist")
        } else {
            res.status(403).json("Restricted Artist Access! Illegal Request");
        }
    })
}

export {verifyToken, verifyTokenAuth, verifyTokenAdmin, verifyTokenArtist};