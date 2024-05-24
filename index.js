const express = require('express')
const { dbConnection } = require('./config/config')
const routes = require('./routes')

const app = express()
const PORT = 8080
//conexion base de datos
dbConnection()

app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))