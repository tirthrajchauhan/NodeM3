const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const config = require('./db');

const Patient = require('./models/Patient');
const PatientRoute = require('./routes/PatientRoute');

const PORT = process.env.PORT||7000;

mongoose.connect("mongodb://localhost:27017/milestone3", { useNewUrlParser: true }).then(
    () => {console.log('Database is connected')},
    err => {console.log('Can not connect to the database' +err)
});

app.use(bodyParser.json());

app.post('/patients', PatientRoute.addPatient);
app.get('/patients', PatientRoute.getPatients);
app.delete('/patients/:id', PatientRoute.deletePatient)
app.get('/patients/:id', PatientRoute.getPatientById)

app.post('/patients/:id/records',PatientRoute.addRecord);
app.get('/patients/:id/records', PatientRoute.getRecords);

app.listen(PORT, function(){
    console.log('Your node js server is running on port: ',PORT);
});
