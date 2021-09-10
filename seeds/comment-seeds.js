const { Comment } = require('../models');

const commentData = [{

    comment_text: "This information is great!",
        user_id: 1,
        post_id: 1
    },
    {
    comment_text: "Exactly what I needed.",
        user_id: 1,
        post_id: 2
    },
    {
    comment_text: "Great post, needed this!",
        user_id: 1,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;