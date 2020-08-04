var connection = require("./connection");
var getPlace = require("./queryPlace")

const exec_query = (query) => {
    return new Promise((resolve, reject)=>{
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            };
            
            resolve({
                success: true,
                data: results
            });
        })
    });
}

const exec_query_insert =(query)=>{
    return new Promise((resolve, reject)=>{
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            };
            resolve({
                success: true
            });
        })
    });
} 

//2 query
const exec_2_query = (queryDeleteTrip,queryDeleteUserTrip) => {
    return new Promise((resolve, reject)=>{
        connection.query(queryDeleteTrip, (errInsertTrip, resultsInsertTrip) => {
            if (errInsertTrip) {
                reject(errInsertTrip);
            };
        
            connection.query(queryDeleteUserTrip, (errGetId, resultGetId) => {
                if (errGetId) {
                    reject(errGetId);
                };
                resolve({
                    success: true,
                    data:resultGetId
                });
            })
        })
    });
}

//2 comment
const exec_2_add_query = (idUser,query1) => {
    return new Promise((resolve, reject)=>{
        connection.query(query1, (errquery1, resultsquery1) => {
            if (errquery1) {
                reject(errquery1);
            };

            var idComment = resultsquery1.insertId;
        
            connection.query(getPlace.getInforComment(idComment,idUser), (err, result) => {
                if (err) {
                    reject(err);
                };
                resolve({
                    success: true,
                    data: result
                });
            })
        })
    });
}

//2 query get post
const exec_3_query_post = (queryGetSumComment,queryGetSumLike,queryCheckLike)=>{
    return new Promise((resolve, reject)=>{
        connection.query(queryGetSumComment, (errGetSumComment, resultsGetSumComment) => {
            if (errGetSumComment) {
                reject(errGetSumComment);
            };

            var result1 = resultsGetSumComment;
            
            connection.query(queryGetSumLike, (errGetSumLike, resultGetSumLike) => {
                if (errGetSumLike) {
                    reject(errGetSumLike);
                };
                var result2 = resultGetSumLike;
              
                connection.query(queryCheckLike, (errCheckLike, resultCheckLike) => {
                    
                    if (errCheckLike) {
                        reject(errCheckLike);
                    };
                    var result3 = resultCheckLike;

                    resolve({
                        sumcomment: result1,
                        sumlike: result2,
                        checklike: result3
                    });
                })
            })
        })
    });
}

//3 query
const exec_3_query = (querysInsertTrip,queryGetId,idUser) => {
    return new Promise((resolve, reject)=>{
        connection.query(querysInsertTrip, (errInsertTrip, resultsInsertTrip) => {
            if (errInsertTrip) {
                reject(errInsertTrip);
            };
            connection.query(queryGetId, (errGetId, resultGetId) => {
                if (errGetId) {
                    reject(errGetId);
                };
                // console.log("insert user-trip:"+ idUser+"---"+resultGetId.IdTrip);
                console.log(resultGetId)
                var idTrip1 = resultGetId[0].IdTrip;
                connection.query(`INSERT INTO usertrip(IdUser,IdTrip) VALUES (${idUser},${idTrip1})`, (errInsertUserTrip, resultInsertUserTrip) => {
                    
                    if (errInsertUserTrip) {
                        reject(errInsertUserTrip);
                    };
                    resolve({
                        success: true,
                        data: resultGetId
                    });
                })
            })
        })
    });
}


module.exports = {
    exec_query,
    exec_query_insert,
    exec_2_query,
    exec_3_query,
    exec_3_query_post,
    exec_2_add_query 
}

    //2 promise

    // const exec_query = (query) => {
    //     return new Promise((resolve, reject)=>{
    //         connection.query(query, (err, results) => {
    //             if (err) {
    //                 reject(err);
    //             };
    //             resolve({
    //                 success: true,
    //                 data: results
    //             });
    //         })
    //     });
    // }
    
    // exec_query.then(data=>{
    //   return new Promise((resolve, reject)=>{
    //         connection.query(query, (err, results) => {
    //             if (err) {
    //                 reject(err);
    //             };
    //             resolve({
    //                 success: true,
    //                 data: results
    //             });
    //         })
    //     });
    // })





