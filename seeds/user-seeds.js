const { User } = require("../models");

const userData = [
    {
      username: "casanova",
      password: "12345678",
    },
    {
      username: "anonymouse",
      password: "98765432",
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;