const express = require('express');
const app = express();
//const router = express.Router();
var mongo = require('mongodb');

const Patient = require('../models/Patient');
const Record = require('../models/Record');

exports.addPatient = function (req, res) {  
    const patient = new Patient(req.body);

    patient.save()
    .then(patient => {
        res.status(200).json({'patient': 'Patient added successfully'});
    })
    .catch(err => {
        res.status(400).send("Unable to save the patient into database");
    });
};

// Defined get data(index or listing) route
exports.getPatients = function (req, res) {
    Patient.find(function (err, patient){
      if(err){
        console.log(err);
      }
      else {
        res.json(patient);
      }
    });
};
  
// Defined delete | remove | destroy route
exports.deletePatient = function (req, res) {
    Patient.findByIdAndRemove({_id: req.params.id}, function(err, patient){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
};

exports.getPatientById = function (req, res) {
    Patient.findOne({_id: req.params.id}, function (err, patient){
      if(err){
        console.log(err);
      }
      else {
        res.json(patient);
      }
    })
};

//insert records to specific patient
exports.addRecord = function (req, res, next) {
    //const record = new Record(req.body);
    //var pid = req.params.id;
    var newRecord = new Record({
        patient_id: req.params.id, 
        blood_pressure: req.body.blood_pressure,
        heart_rate: req.body.heart_rate,
        respiratory_rate: req.body.respiratory_rate,
        blood_oxygen: req.body.blood_oxygen
      });
    Patient.findById({ _id: req.params.id }, (err, patient) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            if (!patient) {
                console.log(`->No Patient with ID [${req.params.id}] found`);
                res.status(404).json({ success: false, msg: "No Patient Found" })
            }
            else {
                // Create the patient and saving to db
                newRecord.save(function (error, result) {
                    // If there are any errors, pass them to next in the correct format
                    if (error) console.log (error)
                    // Send the patient if no issues
                    res.send(201, result)})
                }
    })
  };

  // Find patient records
exports.getRecords = function (req, res, next){

    Patient.findById({ _id: req.params.id }, (err, patient) => {
      if (err) {
          console.log(err);
          res.json(err);
      }
      if (!patient) {
          console.log(`->No patient with ID [${req.params.id}] found`);
         // res.status(404).json({ success: false, msg: "No Patient Found" })
      }
      else {
        Record.find({patient_id: req.params.id}).exec(function (error, record) {
          // If there are any errors, pass them to next in the correct format
          if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
          if (record) {
            // Send the record if no issues
            res.send(record)
          } else {
            // Send 404 header if the record doesn't exist
            res.send(404)
          }
        })
      }
  })
};
//module.exports = router;
exports.deleteRecord = function (req, res) {
  Record.findByIdAndRemove({_id: req.params.id}, function(err, patient){
        if(err) res.json(err);
        else res.json('Record successfully removed');
    });
};