
import * as mysql from 'mysql2'

export const development = mysql.createConnection({
    user: "root",
    password: "",
    database: "ircproject",
    host: "localhost",
    port: 3406,
})

development.connect((error) => {
    if (error) {
        console.error('An error as occured', error)
    } else {
        console.log("connected")
    }
})
