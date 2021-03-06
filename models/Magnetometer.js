var mongoose = require('mongoose');

var MagnetometerSchema = new mongoose.Schema({
    sensID: String,
    val_x: String,
    val_y: String,
    val_z: String,
    //date: String,
    date: { type: Date, default: Date.now }, 
  });
  
  module.exports = mongoose.model('Magnetometer', MagnetometerSchema);