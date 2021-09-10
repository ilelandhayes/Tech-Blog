const commentSeeds = require('./comment-seeds');
const postSeeds = require('./post-seeds');
const userSeeds = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });

    await commentSeeds();

    await postSeeds();

    await userSeeds();

    process.exit(0);
};

seedAll();