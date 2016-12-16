var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes');
var Favorites = require('../models/favorites')

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

var Verify = require('./verify');

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        Favorites.find({'postedBy': req.decoded._doc._id})
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, favorites) {
                if (err) return err;
                res.json(favorites);
            });
    })

    .post(function (req, res, next) {

        Favorites.update({'postedBy': req.decoded._doc._id}, {$push: {dishes:req.body._id}} ,function (err, favorite) {
                if (err) throw err;
            res.json(favorite);


    //            if (favorite.dishes) {
    //
    //                    favorite.dishes.push(req.body._id);
    //                    favorite.dishes.save(function (err, favorite) {
    //                        if (err) throw err;
    //                        console.log('pushed one!');
    //                        res.json(favorite);
    //                    });
    //
    //
    //            } else {
    //
    //                Favorites.create({postedBy: req.body.postedBy}, function (err, favorite) {
    //                    if (err) throw err;
    //                    favorite.dishes.push(req.body._id);
    //                    favorite.save(function (err, favorite) {
    //                        if (err) throw err;
    //                        console.log('created and pushed one');
    //                        res.json(favorite);
    //                    });
    //                })
    //            }
           });
    })


.delete(function (req, res, next) {
        Favorites.remove({'postedBy': req.decoded._doc._id}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        })
    });

// favoriteRouter.route('/:favoriteId')
// .get(function (req, res, next) {
//     Favorites.findById(req.params.favoriteId)
//         .populate('comments.postedBy')
//         .exec( function (err, favorite) {if (err) throw err;
//         res.json(favorite);
//     });
// })

// .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
//     Favorites.findByIdAndUpdate(req.params.favoriteId, {
//         $set: req.body
//     }, {
//         new: true
//     }, function (err, favorite) {
//         if (err) throw err;
//         res.json(favorite);
//     });
// })

// .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
//     Favorites.findByIdAndRemove(req.params.favoriteId, function (err, resp) {        if (err) throw err;
//         res.json(resp);
//     });
// });
// favoriteRouter.route('/:favoriteId/comments')
// .all(Verify.verifyOrdinaryUser)
// .get(function (req, res, next) {
//     Favorites.findById(req.params.favoriteId)
//         .populate('comments.postedBy')
//         .exec( function (err, favorite) {
//         if (err) throw err;
//         res.json(favorite.comments);
//     });
// })

// .post(Verify.verifyOrdinaryUser, function (req, res, next) {
//     Favorites.findById(req.params.favoriteId, function (err, favorite) {
//         if (err) throw err;
//         req.body.postedBy = req.decoded._doc._id;
//         favorite.comments.push(req.body);
//         favorite.save(function (err, favorite) {
//             if (err) throw err;
//             console.log('Updated Comments!');
//             res.json(favorite);
//         });
//     });
// })

// .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
//     Favorites.findById(req.params.favoriteId, function (err, favorite) {
//         if (err) throw err;
//         for (var i = (favorite.comments.length - 1); i >= 0; i--) {
//             favorite.comments.id(favorite.comments[i]._id).remove();
//         }
//         favorite.save(function (err, result) {
//             if (err) throw err;
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             });
//             res.end('Deleted all comments!');
//         });
//     });
// });

// favoriteRouter.route('/:favoriteId/comments/:commentId')
// .all(Verify.verifyOrdinaryUser)
// .get(function (req, res, next) {
//     Favorites.findById(req.params.favoriteId)
//         .populate('comments.postedBy')
//         .exec ( function (err, favorite) {
//         if (err) throw err;
//         res.json(favorite.comments.id(req.params.commentId));
//     });
// })

// .put(function (req, res, next) {
//     // We delete the existing commment and insert the updated
//     // comment as a new comment
//     Favorites.findById(req.params.favoriteId, function (err, favorite) {
//         if (err) throw err;
        
//         favorite.comments.id(req.params.commentId).remove();
       
//         req.body.postedBy = req.decoded._doc._id;
        
//         favorite.comments.push(req.body);
//         favorite.save(function (err, favorite) {
//             if (err) throw err;
//             console.log('Updated Comments!');
//             res.json(favorite);
//         });
//     });
// })

// .delete(function (req, res, next) {
//     Favorites.findById(req.params.favoriteId, function (err, favorite) {
        
//         if(favorite.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
//             var err = new Error('You are not authorized to perform this operation!');
//             err.status = 403;
//             return next(err);
//         }
//         favorite.comments.id(req.params.commentId).remove();
//         favorite.save(function (err, resp) {
//             if (err) throw err;
//             res.json(resp);
//         });
//     });
// });

module.exports = favoriteRouter;