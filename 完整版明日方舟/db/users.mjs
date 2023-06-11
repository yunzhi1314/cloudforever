import mysql from "mysql"

let db = mysql.createPool({
        host:'127.0.0.1',
        user:"root",
        password:'msrwzh123',
        database:'users',
        multipleStatements: true
})

export default db