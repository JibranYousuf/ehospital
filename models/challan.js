const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Challan Schema
var Schema = mongoose.Schema;
const ChallanSchema = Schema({
  challanNo: {
    type: String,
    required: true
  },
  challanType: {
    type: String,
    required: true,
  },
  challanDateCreated:{
    type: String,
    required: true,
  },
  challanDatePaid:{
    type: String,
    required: true,
  },
  contactnum:{
    type: String,
    required: true,
  },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]

});

const Challan = module.exports = mongoose.model('Challan', ChallanSchema);

module.exports.getUserById = function(id, callback){
  Challan.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  Challan.findOne(query, callback);
}