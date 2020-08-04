// login
const login = (username,password,type) => {
    let query = `select IdUser,Username,EmailUser from user where Username = "${username}" AND Password = "${password}" AND Type = "${type}"`;
    return query;
}

const deletePlace = (idPlace) => {
    let query = `UPDATE place SET place.Status = "delete" WHERE place.IdPlace = ${idPlace}`;
    return query;
}

const deleteUser = (idUser) => {
    let query = `UPDATE user SET user.Status = "delete" WHERE user.IdUser = ${idUser}`;
    return query;
}

const getAllPlaceInfoManager = () => {
    let query = `SELECT place.IdPlace,place.NamePlace,place.CoordinatePlace,place.AddressPlace,place.TypePlace,place.ListImageUrl,AVG(ratingplace.LocationRating) AS Location ,AVG(ratingplace.PriceRating) AS Price,AVG(ratingplace.QualityRating) AS Quality,AVG(ratingplace.ServiceRating) AS Service, COUNT(ratingplace.IdUserRating) as SumRating
    FROM place 
    LEFT JOIN ratingplace ON place.IdPlace = ratingplace.IdPlaceRating
    WHERE (place.Status <> "delete" OR place.Status IS NULL)
    GROUP BY place.IdPlace`;
    return query;
}

const getAllUserManager = () => { 
    let query = `SELECT IdUser, Username, EmailUser, Sex,
    CASE WHEN BirthdayUser IS NOT NUll THEN BirthdayUser ELSE "" END AS BirthdayUser,
    CASE WHEN AddressUser IS NOT NUll THEN AddressUser ELSE "" END AS AddressUser,
    CASE WHEN ImageUrlUser IS NOT NUll THEN ImageUrlUser ELSE "" END AS ImageUrlUser,
    CASE WHEN PhoneNumber IS NOT NUll THEN PhoneNumber ELSE "" END AS PhoneNumber,
    CASE WHEN DescriptionUser IS NOT NUll THEN DescriptionUser ELSE "" END AS DescriptionUser
    FROM user 
    WHERE Type = "Thành viên" AND (Status <> "delete" OR Status IS NULL)`;
    return query;
}

const loadNotificationManager = (idUser) => { 
    let query = `SELECT user.Username,notification.IdNotification,notification.Name,notification.Type,notification.Time,notification.Status,
    CASE WHEN ImageUrlUser IS NOT NUll THEN ImageUrlUser ELSE "" END AS ImageUrlUser
    FROM notification
    LEFT JOIN user on user.IdUser = notification.IdUser
    WHERE user.IdUser = ${idUser}`;
    return query;
}

module.exports = {
    login,
    getAllPlaceInfoManager,
    deletePlace,
    deleteUser,
    getAllUserManager,
    loadNotificationManager
}