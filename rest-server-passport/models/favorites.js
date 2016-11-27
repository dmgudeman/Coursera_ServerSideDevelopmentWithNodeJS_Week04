// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// require('mongoose-currency').loadType(mongoose);
// var Currency = mongoose.Types.Currency;

// var commentSchema = new Schema({
//     rating:  {
//         type: Number,
//         min: 1,
//         max: 5,
//         required: true
//     },
//     comment:  {
//         type: String,
//         required: true
//     },
//     postedBy:  {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// }, {
//     timestamps: true
// });

// create a schema for image type
//var ImageSchema = new Schema({
 // url : { type : String},
 // created : { type : Date, default : Date.now }
//});
//var Image = db.model('images', ImageSchema);

// create a schema
var favoriteSchema = new Schema({
        postedBy: {
            required: true
            ,type: mongoose.Schema.Types.ObjectId
            ,ref: 'User'
        }
        , dishes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } ]
    }
    , {
        timestamps : true
    }
);

// the schema is useless so far
// we need to create a model using it
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;