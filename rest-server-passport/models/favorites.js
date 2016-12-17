// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;






// create a schema
var favoriteSchema = new Schema({
        postedBy: {
            required: true
            ,type: mongoose.Schema.Types.ObjectId
            ,ref: 'User'
        }
        , dishes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dish'
        } ]
    }
    , {
        timestamps : true
    }
);



var Favorites = mongoose.model('Favorite', favoriteSchema);
favoriteSchema.statics.isEmpty = function(cb) {
    return(this.model('Favorite').dishes.length, cb)};
// make this available to our Node applications
module.exports = Favorites;