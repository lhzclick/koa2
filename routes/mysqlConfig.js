var mysql = require('mysql2');

const pool = mysql.createPool({
    host: '118.89.34.119',
    user: 'liuhu',
    database: 'blog',
    password: 'liuhu423',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

let allServices = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
    findUserData: function (name) {
        let _sql = `select * from test`
        return allServices.query(_sql)
    }
}

module.exports = allServices