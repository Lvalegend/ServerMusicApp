// Phân quyền
const checkDecentralizationUser = (req, res, next) => {
    const role = req.user.role
    console.log('role:',role);
    if( role === "normal" ){
        return res.status(200).json({ redirect: '/UserAfterLoginOrRegister'});
    }
    if( role === "manager" ){
        return res.status(200).json({ redirect: '/ManageScreen'});
    }
    else{
        return res.json("Not Permission")
    }
}

module.exports = checkDecentralizationUser
