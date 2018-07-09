const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//models
const Users = require('../models/Users');
const Post = require('../models/Post');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  const users = new Users(req.body);
  const promise = users.save();

  promise.then((data) =>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/signin', (req, res, next) => {
  const user = req.body;
  const promise = Users.find({ userName: req.body.userName, password: req.body.password });
  promise.then((data) => {
    if (data.length == 0){
      res.json({
        status: false,
        message: "Giriş Yapılamadı!!!"
      });
    }else{
      res.json(data);
    }
  }).catch((err) => {
    res.json({
      status: false,
      message: "Giriş Yapılamadı!!!"
    });
  });
});

module.exports = router;
