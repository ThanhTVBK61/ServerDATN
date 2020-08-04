
const getTripByIdUser = (idUser) => {
    let query = `select trip.IdTrip,trip.NameTrip,trip.ImageUrl,trip.TimeTrip,trip.DescriptionTrip
    FROM trip
    LEFT JOIN usertrip ON usertrip.IdTrip = trip.IdTrip
    WHERE usertrip.IdUser = ${idUser} AND (trip.Status <> 'delete' OR trip.Status IS NULL)`;
    return query;
}

const getTripInformationById = (idTrip) => {
    let query = `SELECT trip.IdTrip,trip.NameTrip,trip.TimeTrip,trip.DescriptionTrip,user.Username
    FROM usertrip
    LEFT JOIN trip ON usertrip.IdTrip = trip.IdTrip
    LEFT JOIN user ON user.IdUser = usertrip.IdUser
    WHERE trip.IdTrip = ${idTrip}`
    return query;
}

const getPlaceInTrip = (idTrip, idUser) => {
    let query = `SELECT  place.IdPlace,place.NamePlace,place.AddressPlace,place.CoordinatePlace,place.TypePlace,place.ListImageUrl,
    place.TimePlace,place.DayTimePlace,place.PhoneNumberPlace,place.EmailPlace,place.Overview,tripplace.Note,
    AVG(ratingplace.LocationRating) AS Location ,AVG(ratingplace.PriceRating) AS Price,AVG(ratingplace.QualityRating) AS Quality,AVG(ratingplace.ServiceRating) AS Service, 		COUNT(ratingplace.IdUserRating) as SumRating,
    CASE WHEN favourite.IdFavourite IS NOT NUll THEN true ELSE false END AS MyFavourite,
    COUNT(ratingplace.IdUserRating) as SumRating
    FROM place 
    LEFT JOIN ratingplace ON place.IdPlace = ratingplace.IdPlaceRating
    LEFT JOIN favourite ON place.IdPlace = favourite.IdPlace AND favourite.IdUser = ${idUser}
    LEFT JOIN tripplace ON place.IdPlace = tripplace.IdPlace
    LEFT JOIN trip ON trip.IdTrip = tripplace.IdTrip
    WHERE trip.IdTrip = ${idTrip}
    GROUP BY place.IdPlace`;
    return query;
}

const getAllUser = () => {
    let query = `SELECT Username,IdUser,ImageUrlUser FROM user`;
    return query;
}

const addNewTrip = (name,image) => {
    let query = `INSERT INTO trip(NameTrip,ImageUrl) VALUES ("${name}","${image}")`;
    return query;
}

const getTripByName = (name) => {
    let query = `SELECT IdTrip,NameTrip,ImageUrl,TimeTrip,DescriptionTrip FROM trip WHERE NameTrip = "${name}"`;
    return query;
}

const addUserToUserTrip = (idUser,idTrip) => {
    let query = `INSERT INTO usertrip(IdUser,IdTrip) VALUES (${idUser},${idTrip})`;
    return query;
}

const updateEditTrip = (id,name,description) => {
    let query = `UPDATE trip SET NameTrip = "${name}",DescriptionTrip = "${description}" WHERE IdTrip = ${id}`;
    return query;
}

const updateTimeTrip = (id,time) => {
    let query = `UPDATE trip SET TimeTrip = "${time}" WHERE IdTrip = ${id}`;
    return query;
}
//Xóa địa điểm trong chuyến đi
const deletePlaceInTrip = (idTrip,idPlace) => {
    let query = `DELETE FROM tripplace WHERE (tripplace.IdTrip = ${idTrip} AND tripplace.IdPlace = ${idPlace})`;
    return query;
}

//Thêm địa điểm trong chuyến đi
const addPlaceInTrip = (idTrip,idPlace) => {
    let query = `INSERT INTO tripplace(tripplace.IdTrip, tripplace.IdPlace) VALUES (${idTrip},${idPlace})`;
    return query;
}

//Xóa chuyến đi
const deleteTrip = (idTrip) => {
    let query = `UPDATE trip SET trip.Status = "delete" WHERE trip.IdTrip = ${idTrip}`;
    return query;
}

//Xóa data trong bang usertrip
const deleteUserTrip = (idTrip,idUser) => {
    let query = `DELETE FROM usertrip WHERE (usertrip.IdTrip = ${idTrip} AND usertrip.IdUser = ${idUser})`;
    return query;
}

//Thêm thành viên vào trong usertrip
const addUserTrip = (idTrip,idUser) => {
    let query = `INSERT INTO usertrip(usertrip.IdUser, usertrip.IdTrip) VALUES (${idUser},${idTrip})`;
    return query;
}

//Lấy chuyến đi không chứa địa điểm truyền vào
const loadTripByIdPlace = (idUser,idPlace) => {
    let query = `SELECT trip.IdTrip,trip.NameTrip
    FROM trip
    LEFT JOIN usertrip ON (trip.IdTrip = usertrip.IdTrip AND usertrip.IdUser = ${idUser})
    WHERE usertrip.IdTrip NOT IN (SELECT tripplace.IdTrip FROM tripplace WHERE tripplace.IdPlace = ${idPlace})`;
    return query;
}


module.exports = {
    getTripByIdUser,
    getTripInformationById,
    getPlaceInTrip,
    getAllUser,
    addNewTrip,
    getTripByName,
    addUserToUserTrip,
    updateEditTrip,
    updateTimeTrip,
    deletePlaceInTrip,
    deleteTrip,
    deleteUserTrip,
    addUserTrip,
    addPlaceInTrip,
    loadTripByIdPlace
}