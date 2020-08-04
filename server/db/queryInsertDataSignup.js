const insertUserSignup = (Username,Password,EmailUser,Sex,BirthdayUser,AddressUser)=>{
    let query = `Insert Into user (Username,Password,EmailUser,Sex,BirthdayUser,AddressUser) VALUES ("${Username}","${Password}","${EmailUser}",${Sex},"${BirthdayUser}","${AddressUser}")`;
    return query;
}

module.exports ={
    insertUserSignup
}