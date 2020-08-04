const mongoose = require('mongoose')
const Schema = mongoose.Schema
const articleSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
        unique: true
    },
    URL: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article