/**
 * Created by Ben on 10/26/2015.
 */

var db = require('./db.js');


var getRating = function getRating(product_id, callback) {

    var get = {product_id: product_id};
    db.pool.getConnection(function (err, connection) {
        // Use the connection
        //connection.query('SELECT * FROM PRODUCTS WHERE ?', get, function (err, results) {
        connection.query('SELECT CAST(AVG(rating) AS DECIMAL(3,2)) FROM csc443.ratings WHERE ?', get, function (err, results) {
            if (!err) {
                if (results[0] != null) {
                    callback(null, results);
                } else {
                    callback("Product not found.", null);
                }
            } else {
                callback(err, null);
            }
            //release
            connection.release();
        });

    });
}


module.exports.getRating = getRating;