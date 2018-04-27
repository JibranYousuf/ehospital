const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Citizen Schema
const CitizenSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType:{
    type: String,
    required: true,
  },
  address:{
    type: String,
  },
  gender:{
    type: String,
  },
  age:{
    type: String,
  },
  dob:{
    type: String,
  },
  contactnum:{
    type: String,
  },
  qualification:{
    type: String,
  },
  designation:{
    type: String,
  },
  licenseNo:{
    type: String,
  },
  challans:[
    {
    licenseNo:String,
    challanNo:String,
    challanType: String,
    challanDateCreated:String,
    challanDatePaid:String,
    contactnum:String
  }]
});

const Citizen = module.exports = mongoose.model('Citizen', CitizenSchema);

module.exports.getUserById = function(id, callback){
  Citizen.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  Citizen.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}