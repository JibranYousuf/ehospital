const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Staff = require('../models/staff');

//Register
router.post('/register', (req,res,next) =>{
let newStaff = new Staff({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    userType: req.body.userType
});
    Staff.addStaff(newStaff, (err, staff)=>{
        if(err){
                res.json(
                    {
                    success: false, msg: 'failed to register staff'
                    });
                }
        else{
            res.json(
                {
                    success: true, msg: 'Staff Added'
                });
            }
    });
});

//Authenticate
router.post('/authenticate', (req,res) =>{
   
        const username = req.body.username;
        const password = req.body.password; 
        Staff.getUserByUsername(username, (err, staff) =>{
        if(err) throw err;
        if(!staff){
            return res.json({
                success: false, msg: 'staff not found'
                            });
        }
        Staff.comparePassword(password, staff.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                let payload = {
                    _id: staff._id,
                    name: staff.name,
                    username: staff.username,
                    email: staff.email,
                    password: staff.password,
                    userType: staff.userType
                };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 604800  //1 week
                });
                return res.json({
                    success: true,
                    token: 'bearer '+ token,
                    staff: {
                        id: staff._id,
                        name: staff.name,
                        username: staff.username,
                        email : staff.email,
                        userType : staff.userType,
                    }
                });
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({staff: req.staff});
  });

router.get('/getall', (req, res, next) => {
    Staff.find(function(err, getStaffData) {

        // if there is an error retrieving, send the error. 
                        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        else{
        res.json({ getStaffData: getStaffData }); 
    }
    });
});

router.get('/getuser', function (req, res, next) {
      
    Staff.findOne({ username: req.query.username },function (err, staff) {
        if (err) {
            console.log("username err", err)
            return res.status(500).send(err)
            // return err
        }
        if(staff.username !== req.query.username){
            return res.status(404).send('username invalid');
          }
          console.log("You are Successfully Searched: Welcome ", staff.username)
          console.log("User_id: ", staff._id)
          console.log("Staff Password: ", staff.password)
          console.log("You created account on: ", staff.userType)
               return res.status(200).send(staff);
  });
})

router.put('/update/:id', function (req, res, next) {
      
    Staff.findByIdAndUpdate( req.params.id, req.body, {new: true}, function (err, staff) {
        if (err) return res.status(500).send("There was a problem updating the staff.");
        res.status(200).send(staff);
  });
});

router.delete('/delete/:id', function (req, res) {
    Staff.findByIdAndRemove(req.params.id, function (err, staff) {
        if (err) { 
        return res.status(500).send("There was a problem deleting the staff.");
    } else {
        return res.status(200).send("Staff "+ staff.username +" was deleted.");
        res.json({ staff: staff });
    }
    });
});

module.exports = router;