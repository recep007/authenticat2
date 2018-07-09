const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
//models
const Post = require('../models/Post');
const Users = require('../models/Users');

router.get('/',(req, res) => {
  const promise = Post.aggregate([
    {
			$lookup: {
				from: 'users',
				localField: 'user_id',
				foreignField: '_id',
				as: 'user'
			}
		},
    {
			$unwind: {
				path: '$user',
				preserveNullAndEmptyArrays: true
			}
		},
    {
			$project: {
        username: '$user.userName',
				name: '$user.name',
        surname: '$user.surname',
        phone: '$user.phoneNumber',
        status: '$status',
        location: '$location'
			}
		}

  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/', (req, res, next) => {
  const post = new Post(req.body);
  const users = new Users(req.body);
  const promise = Users.find({ _id: req.body.user_id });
  promise.then((data) =>{
    if (data.length == 0){
      res.send("Yok");
    }
    else if (data.length!=0){
      const promise2 = post.save();
      promise2.then((data) =>{
        res.json(data);
      }).catch((err) => {
        res.json(err);
      });
    }
    else{
      res.send("err");
    }
  })
});
module.exports = router;
