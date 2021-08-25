var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    title: {type: String},
    description: {type: String},
    tags: {type: [String]},
    author: {type: String},
    likes: {type: Number},
}, {timestamps: true});

var Article = mongoose.model("Article" , userSchema);

module.exports = Article;