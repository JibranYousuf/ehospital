const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Staff Schema
const StaffSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  userType:{
    type: String,
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
  password: {
    type: String,
    required: true
  },
  dob:{
    type: String,
  },
  contactnum:{
    type: Number,
  },
  designation:{
      type: String,
  }

});

const Staff = module.exports = mongoose.model('Staff', StaffSchema);

module.exports.getUserById = function(id, callback){
  Staff.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  Staff.findOne(query, callback);
}

module.exports.addStaff = function(newStaff, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newStaff.password, salt, (err, hash) => {
      if(err) throw err;
      newStaff.password = hash;
      newStaff.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}