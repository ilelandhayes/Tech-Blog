const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
    try {
      const commentData = await Comment.findAll({});
  
      res.json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get("/:id", async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        where: {
          id: req.params.id,
        },
      });
      res.json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        try {
          const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
          });
          res.json(newComment);
        } catch (err) {
          res.status(500).json(err);
        }
    }
});

router.put("/:id", withAuth, async (req, res) => {
    try {
      const updateComment = await Comment.update(
        {
          comment_text: req.body.comment_text,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      if (!updateComment) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(updateComment);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deleteComment = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deleteComment) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(deleteComment);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;