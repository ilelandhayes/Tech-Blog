const commentSeeds = require('./comment-seeds');
const postSeeds = require('./post-seeds');
const userSeeds = require('./user-seeds');

const sequelize = require('../config/connection');
const seedComments = require('./comment-seeds');
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');

const seedDatabase = async() => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedPosts();
    
    await seedComments();

    process.exit(0);
};

seedDatabase();