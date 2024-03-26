// ? title, body , author, tags, thumnail, readTime, likes, comments, dislikes

const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
    
}, {
    timestamps: true
});

const Post = model("Post", postSchema);

module.exports = Post;
