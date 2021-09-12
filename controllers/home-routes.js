const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
      const postData = await Post.findAll({
        attributes: ["id", "title", "content", "created_at"],
        order: [["created_at", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: User,
              attributes: ["username"],
            },
            },
        ],
    });

    const posts = postData.map((post) => posts.get({ plain: true }));

    res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });

      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
});
  
  router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("signup");
});

router.get("/post/:id", async (req, res) => {
    try {
      const postData = await Post.findOne({
          where: {
            id: req.params.id
          },
        attributes: ["id", "title", "content", "created_at"],
        order: [["created_at", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "post_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
        ],
    });

    if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = postData.get({ plain: true });
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/posts-comments", async (req, res) => {
 
    try {
      const postData = await Post.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [
            {
              model: User,
              attributes: ["username"],
            },
            {
              model: Comment,
              attributes: [
                "id",
                "comment_text",
                "post_id",
                "user_id",
                "created_at",
              ],
              include: {
                model: User,
                attributes: ["username"],
              },
            },
          ],
      });

      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = postData.get({ plain: true });

      res.render("posts-comments", { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;