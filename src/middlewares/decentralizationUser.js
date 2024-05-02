// Phân quyền

const checkUserNormal = (req, res, next) => {
    const role = req.user.role
    if( role === "normal" || role === "manager" ){
        next()
    }
    else{
        res.json("Not Permission")
    }
}
const checkUserManager = (req, res, next) => {
    const role = req.user.role
    if( role === "manager" ){
        next()
    }
    else{
        res.json("Not Permission")
    }
}

module.exports = {checkUserNormal, checkUserManager}
