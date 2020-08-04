
const getAllPlace = (idUser) => {
    // let query = `SELECT place.IdPlace,place.NamePlace,place.CoordinatePlace,place.AddressPlace,place.TypePlace,place.ListImageUrl,AVG(ratingplace.LocationRating) AS Location ,AVG(ratingplace.PriceRating) AS Price,AVG(ratingplace.QualityRating) AS Quality,AVG(ratingplace.ServiceRating) AS Service, COUNT(ratingplace.IdUserRating) as SumRating
    // FROM place LEFT JOIN ratingplace ON place.IdPlace = ratingplace.IdPlaceRating
    // GROUP BY place.IdPlace`;

    let query = `SELECT place.IdPlace,place.NamePlace,place.CoordinatePlace,place.AddressPlace,place.TypePlace,place.ListImageUrl,AVG(ratingplace.LocationRating) AS Location ,AVG(ratingplace.PriceRating) AS Price,AVG(ratingplace.QualityRating) AS Quality,AVG(ratingplace.ServiceRating) AS Service, COUNT(ratingplace.IdUserRating) as SumRating,
    CASE WHEN favourite.IdFavourite IS NOT NUll THEN true ELSE false END AS MyFavourite
    FROM place 
    LEFT JOIN ratingplace ON place.IdPlace = ratingplace.IdPlaceRating
    LEFT JOIN favourite ON place.IdPlace = favourite.IdPlace AND favourite.IdUser = ${idUser}
    WHERE (place.Status <> "delete" OR place.Status IS NULL)
        GROUP BY place.IdPlace`;

    return query;
}

const getPlaceByType = (idUser, typePlace) => {
    let query = `SELECT place.IdPlace,place.NamePlace,place.CoordinatePlace,place.AddressPlace,place.TypePlace,place.ListImageUrl,AVG(ratingplace.LocationRating) AS Location ,AVG(ratingplace.PriceRating) AS Price,AVG(ratingplace.QualityRating) AS Quality,AVG(ratingplace.ServiceRating) AS Service, COUNT(ratingplace.IdUserRating) as SumRating,
    CASE WHEN favourite.IdFavourite IS NOT NUll THEN true ELSE false END AS MyFavourite
    FROM place 
    LEFT JOIN ratingplace ON place.IdPlace = ratingplace.IdPlaceRating
    LEFT JOIN favourite ON place.IdPlace = favourite.IdPlace AND favourite.IdUser = ${idUser}
    WHERE (place.Status <> "delete" OR place.Status IS NULL)
        GROUP BY place.IdPlace HAVING place.TypePlace = "${typePlace}"`;
    return query;
}

const getPlaceById = (id) => {
    let query = `SELECT place.IdPlace,place.NamePlace,place.AddressPlace,place.CoordinatePlace,place.TypePlace,place.ListImageUrl,
    place.TimePlace,place.DayTimePlace,place.PhoneNumberPlace,place.EmailPlace,place.Overview,
    AVG(ratingplace.LocationRating) AS Location ,AVG(ratingplace.PriceRating) AS Price,AVG(ratingplace.QualityRating) AS Quality,AVG(ratingplace.ServiceRating) AS Service, COUNT(ratingplace.IdUserRating) as SumRating
    FROM place LEFT JOIN ratingplace ON place.IdPlace = ratingplace.IdPlaceRating
    WHERE (place.Status <> "delete" OR place.Status IS NULL)
    GROUP BY place.IdPlace HAVING place.IdPlace = ${id}`;
    return query;
}

const insertFavouritePlace = (idPlace, idUser) => {
    let query = `INSERT INTO favourite(IdUser, IdPlace) VALUES (${idUser},${idPlace})`;
    return query;
}

const deleteFavouritePlace = (idPlace, idUser) => {
    let query = `DELETE FROM favourite WHERE IdUser = ${idUser} AND IdPlace = ${idPlace}`;
    return query;
}

const getAllFavouritePlace = (idUser) => {
    let query = `SELECT  place.IdPlace,place.NamePlace,place.AddressPlace,place.CoordinatePlace,place.TypePlace,place.ListImageUrl,
    place.TimePlace,place.DayTimePlace,place.PhoneNumberPlace,place.EmailPlace,place.Overview,
    AVG(ratingplace.LocationRating) AS Location ,AVG(ratingplace.PriceRating) AS Price,AVG(ratingplace.QualityRating) AS Quality,AVG(ratingplace.ServiceRating) AS Service, COUNT(ratingplace.IdUserRating) as SumRating
    FROM place 
    LEFT JOIN ratingplace ON place.IdPlace = ratingplace.IdPlaceRating
    LEFT JOIN favourite ON place.IdPlace = favourite.IdPlace
    WHERE favourite.IdUser = ${idUser} AND (place.Status <> "delete" OR place.Status IS NULL)
    GROUP BY place.IdPlace`;
    return query;
}

const loadRatingById = (idUser, idPlace) => {
    let query = `SELECT LocationRating,PriceRating,QualityRating,ServiceRating FROM ratingplace WHERE 
    IdPlaceRating= ${idPlace} AND IdUserRating = ${idUser}`;
    return query;
}

const addRating = (idUser, idPlace, location, price, quality, service) => {
    let query = `INSERT INTO ratingplace (IdUserRating,IdPlaceRating,LocationRating,PriceRating,QualityRating,ServiceRating) 
    VALUES(${idUser},${idPlace},${location},${price},${quality},${service})`;
    return query;
}

const updateRating = (idUser, idPlace, location, price, quality, service) => {
    let query = `UPDATE ratingplace 
    SET LocationRating =${location}, PriceRating=${price}, QualityRating=${quality}, ServiceRating=${service}
    WHERE IdPlaceRating= ${idPlace} AND IdUserRating = ${idUser}`;
    return query;
}

const getPostInforByIdPlace = (idPlace) => {
    let query = `SELECT  user.IdUser,user.Username, postplace.IdPost,postplace.Time,postplace.ContentPost,COUNT(comment.IdUserComment) AS SumComment,
    CASE WHEN AVG(ratingplace.LocationRating) IS NOT NUll THEN AVG(ratingplace.LocationRating) ELSE -1 END AS Location,
    CASE WHEN AVG(ratingplace.PriceRating) IS NOT NUll THEN AVG(ratingplace.PriceRating) ELSE -1 END AS Price,
    CASE WHEN AVG(ratingplace.QualityRating) IS NOT NUll THEN AVG(ratingplace.QualityRating) ELSE -1 END AS Quality,
    CASE WHEN AVG(ratingplace.ServiceRating) IS NOT NUll THEN AVG(ratingplace.ServiceRating) ELSE -1 END AS Service
    FROM postplace
    LEFT JOIN comment ON comment.IdPostComment = postplace.IdPost
    LEFT JOIN user ON user.IdUser = postplace.IdUserPost 
    LEFT JOIN ratingplace ON user.IdUser = ratingplace.IdUserRating AND ratingplace.IdPlaceRating = ${idPlace}
    WHERE postplace.IdPlacePost = ${idPlace} AND (postplace.Status <> "delete" OR postplace.Status IS NULL)
    GROUP BY postplace.IdPost`;
    return query;
}

const getSumLikePost = (idPlace) => {
    let query = `SELECT COUNT(likepost.IdUser) AS CountIdLike
    FROM postplace
    LEFT JOIN likepost ON likepost.IdPost = postplace.IdPost
    WHERE postplace.IdPlacePost = ${idPlace} 
    GROUP BY postplace.IdPost`;
    return query;
}

const checkLikeIdUser = (idUser,idPlace) => {
    let query = `SELECT postplace.IdPost AS CountIdLike
    FROM postplace
    LEFT JOIN likepost ON likepost.IdPost= postplace.IdPost 
    WHERE likepost.IdUser =${idUser} AND postplace.IdPlacePost=${idPlace}`;
    return query;
}

const dislikePost = (idUser,idPost) => {
    let query = `DELETE FROM likepost WHERE IdUser=${idUser} AND IdPost=${idPost}`;
    return query;
}

const likePost = (idUser,idPost) => {
    let query = `INSERT INTO likepost(IdUser, IdPost) VALUES (${idUser},${idPost})`;
    return query;
}

const loadComments = (idUser,idPost) => {
    let query = `SELECT comment.IdComment,comment.IdPostComment,comment.ContentComment,comment.Time,comment.IdUserComment,user.Username,
    CASE WHEN user.ImageUrlUser IS NOT NUll THEN user.ImageUrlUser ELSE "" END AS ImageUrlUser,
    CASE WHEN likecomment.IdUserLike = ${idUser} THEN true ELSE false END AS LikeComment,
    COUNT(likecomment.IdUserLike) AS SumLike
    FROM comment
    LEFT JOIN user ON comment.IdUserComment = user.IdUser
    LEFT JOIN likecomment ON likecomment.IdComment = comment.IdComment
    WHERE comment.IdPostComment = ${idPost} AND (comment.Status <> "delete" OR comment.Status IS NULL)
    GROUP BY comment.IdComment`;
    return query;
}

const addComment = (idUser,idPost,content,time) => {
    let query = `INSERT INTO comment(IdUserComment, IdPostComment, ContentComment, Time) VALUES (${idUser},${idPost},"${content}","${time}")`;
    return query;
}

const addLikeComment = (idUser,idComment) => {
    let query = `INSERT INTO likecomment(IdComment, IdUserLike) VALUES (${idComment},${idUser})`;
    return query;
}

const deleteLikeComment = (idComment) => {
    let query = `DELETE FROM likecomment WHERE likecomment.IdComment = ${idComment}`;
    return query;
}

const deleteComment = (idComment) => {
    let query = `UPDATE comment SET comment.Status = "delete" WHERE comment.IdComment = ${idComment}`;
    return query;
}

const deletePost = (idPost) => {
    let query = `UPDATE postplace SET postplace.Status = "delete" WHERE postplace.IdPost = ${idPost}`;
    return query;
}

const getInforComment =(idComment,idUser)=>{
    let query = `SELECT comment.IdComment,comment.IdPostComment,comment.ContentComment,comment.Time,comment.IdUserComment,user.Username,
    CASE WHEN user.ImageUrlUser IS NOT NUll THEN user.ImageUrlUser ELSE "" END AS ImageUrlUser,
    CASE WHEN likecomment.IdUserLike = ${idUser} THEN true ELSE false END AS LikeComment,
    COUNT(likecomment.IdUserLike) AS SumLike
    FROM comment
    LEFT JOIN user ON comment.IdUserComment = user.IdUser
    LEFT JOIN likecomment ON likecomment.IdComment = comment.IdComment
    WHERE comment.IdComment = ${idComment} AND (comment.Status <> "delete" OR comment.Status IS NULL)
    GROUP BY comment.IdComment`;
    return query;
}

const addPost = (idUser, idPlace, content, time) => {
    let query = `INSERT INTO postplace(IdPlacePost, IdUserPost, ContentPost, Time) 
    VALUES (${idPlace},${idUser},"${content}","${time}")`;
    return query;
}

module.exports = {
    getPlaceById,
    getPlaceByType,
    getAllPlace,
    insertFavouritePlace,
    deleteFavouritePlace,
    getAllFavouritePlace,
    loadRatingById,
    addRating,
    updateRating,
    getPostInforByIdPlace,
    getSumLikePost,
    checkLikeIdUser,
    dislikePost,
    likePost,
    loadComments,
    addComment,
    getInforComment,
    addLikeComment,
    deleteLikeComment,
    deleteComment,
    deletePost,
    addPost
}