console.log('friends controller');
var mongoose = require('mongoose');
var Friends = mongoose.model('Friends');

function FriendsController(){
  this.index = function(req,res){
    Friends.find({}, function(err, results){
        if(err){
            console.log('You have an error!');
        } else{
            console.log("Everything went right!");
            res.json(results);
        }
  })};
  this.create = function(req,res){
    //   console.log(">>>>>>>>>>>>", req.body);
      var friend = new Friends({firstName: req.body.firstName, lastName: req.body.lastName, birthDate: req.body.birthDate})
      friend.save(function(err){
          if (err){
              console.log(err);
          } else {
              res.json({placeholder: 'success'})
          }
      })

  };
  this.update = function(req,res){
      console.log("SERVER S SIDE ID", req.params.id);
      Friends.findOne({_id: req.params.id}, function(err, friend){
        if(err){
          console.log(err);
        }else{
          friend.firstName = req.body.firstName;
          friend.lastName = req.body.lastName;
          friend.birthDate = req.body.birthDate;
          friend.save(function(err, updatedFriend){
            if (err){
              console.log(err);
            }else{
              res.json(updatedFriend);
            }
          })
        }
      })
  };
  this.delete = function(req,res){
      console.log("DELETE FUNC OF THE SERVER");
      Friends.remove({_id: req.params.id}, function(err){
        if(err){
          console.log(err);
        }else{
          res.json({message: "Friend deleted!"});
        }
      })
  };
  this.show = function(req,res){
      Friends.findOne({_id: req.params.id}, function(err, result){
        if (err){
            console.log(err);
        } else {
            res.json(result);
        }
      })
  };
}
module.exports = new FriendsController(); // what does this export?
