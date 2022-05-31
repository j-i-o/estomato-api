const express = require('express')
const cors = require('cors')
const { json } = require('express/lib/response')
const res = require('express/lib/response')

const app = express()

let corOptions = {
  origin: 'https://localhost:3306'
}

// Middleware
app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Router
const pacienteRouter = require('./routes/pacienteRouter.js')
const sexoRouter = require('./routes/sexoRouter.js')
const estadoRouter = require('./routes/estadoRouter.js')
const nombLesionRouter = require('./routes/nombLesionRouter.js')
const ubicacionRouter = require('./routes/ubicacionRouter.js')
const lesionRouter = require('./routes/lesionRouter.js')
const consultaRouter = require('./routes/consultaRouter.js')
const mainRouter = require('./routes/mainRouter.js')
app.use('/api/pacientes', pacienteRouter)
app.use('/api/sexo', sexoRouter)
app.use('/api/estado', estadoRouter)
app.use('/api/nombLesion', nombLesionRouter)
app.use('/api/ubicacion', ubicacionRouter)
app.use('/api/lesion', lesionRouter)
app.use('/api/consulta', consultaRouter)
app.use('/api/main', mainRouter)

// Testing API
app.get('/', (req, res) => {
  res.json({ message: 'Holis' })
})

// Port
const PORT = process.env.PORT || 5000

// Server 
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})