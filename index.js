const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const cors = require('cors')
const router = require('./routes/index.js')
const fileUpload = require('express-fileupload')
require('dotenv').config()
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const busboy = require('connect-busboy');
const path = require('path')

const app = express()


app.use(express.json())
app.use(fileUpload())
app.use(cors())
app.use(express.static(path.resolve(__dirname , 'static')))
app.use('/api' , router)
app.use(busboy()); 

app.use(errorHandler)


const PORT = process.env.PORT || 8080
const start = async () => {

    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT , () => {
            console.log(`server is running on port ${PORT}...`)
        })
    }
    catch(e){
        console.log(e)
    }
    
}

start()