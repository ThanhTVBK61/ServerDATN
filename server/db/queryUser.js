
const getUser = (idUser) => {
    let query = `select Username,Sex,BirthdayUser,DescriptionUser from user where IdUser = ${idUser}`;
    return query;
}

// login
const login = (username) => {
    let query = `select IdUser,Username,EmailUser,Password from user where Username = "${username}"`;
    return query;
}

//changePassword
const changePassword = (username,password)=>{
    let query = `update user set Password = "${password}" where Username = "${username}"`;
    return query;
}

const changeInforQuery = (username,datetime,sex,description) => {
    let query = `UPDATE user SET BirthdayUser = "${datetime}", Sex = ${sex}, DescriptionUser = "${description}" WHERE Username = "${username}"`;
    return query;
}

module.exports = {
    getUser,
    login,
    changePassword,
    changeInforQuery
}