const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = process.env.URLDB;
mongoose.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./app/routes/auth');
const dashboadRoutes = require('./app/routes/dashboard.js');
const notesRoutes = require('./app/routes/notes.js');
const verifyToken = require('./app/routes/validate-token');
// route middlewares
app.use('/api/user', authRoutes);

app.use('/api/dashboard', verifyToken, dashboadRoutes);
app.use('/api/notes', verifyToken, notesRoutes);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})
