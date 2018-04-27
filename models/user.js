const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
var Schema = mongoose.Schema;
const UserSchema = Schema({
  constName: {
    type: String
  },
  constEmail: {
    type: String,
    required: true,
    unique: true
  },
  constUsername: {
    type: String,
    required: true,
    unique: true
  },
  constCnic: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  constUserType:{
    type: String,
    required: true,
  },
  constAddress:{
    type: String,
  },
  constGender:{
    type: String,
  },
  constAge:{
    type: String,
  },
  constDob:{
    type: String,
  },
  constContactNum:{
    type: String,
  },
  constQualification:{
    type: String,
  },
  constDesignation:{
    type: String,
  },
  challan: [{
    type: Schema.Types.ObjectId, ref: 'Challan'
  }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByCnic = function(constCnic, callback){
  const query = {constCnic: constCnic}
  User.findOne(query, callback);
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