const Comment = require("../models/comment.models");

async function seedComments() {
    try {
        const newComment = new Comment({
              lead: "68bbd79fa73bc4ecf4967938",
              author: "68bbd7f7a73bc4ecf496793e",
              commentText: "Test Comment alpha"
        });
        await newComment.save();
    } catch (error) {
        throw error;
    }
}

module.exports = { seedComments }