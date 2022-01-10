const config = require('./dbConfig')
const sql = require('mssql')

const getTop5Users = async() => {
    try{
        let pool = await sql.connect(config)
        console.log(pool)
    } 
    catch(err){
        console.log(err)
    }
}

const createUser = async(User) => {
    console.log(User)
    try{
        let pool = await sql.connect(config)
        let createdUser = await pool.request()
        .query(`INSERT INTO Users (username, score, game_type) VALUES (
            '${User.username}',
            ${User.score},
            '${User.game_type}'
        )`)
        return createdUser
    }
    catch(err){
        console.log(err)
    }
}
module.exports = {
    createUser
}