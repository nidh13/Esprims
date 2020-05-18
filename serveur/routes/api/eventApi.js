const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");

router.post("/add", async (req, res) => {
  try {
    const event = await new Event({
      title: req.body.title,
      description: req.body.description,
      date_event: req.body.date_event,
      picture: req.body.picture
    }).save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route GET api/profile
// @desc get all profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) return res.json(event);
    else
      return res.status(404).json({
        msg: "Event not found "
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route Delete api/posts/:id
// @desc Delete a post
// @access Private

// @access Private
router.delete("/delete/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await Event.remove({ _id: req.params.id });
      return res.json({
        msg: " Event Deleted "
      });
    } else {
      return res.status(404).json({
        msg: "Event not found "
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route   POST api/users/updatepassword
// @desc    update password
// @access  Private
router.put("/update", async (req, res) => {
  console.log(req.body)
  try {
    let updatedEvent = {
      title: req.body.title,
      description: req.body.description,
      date_event: req.body.date_event,
      picture: req.body.picture
    };
    event = await Event.findOneAndUpdate({ _id: req.body._id }, updatedEvent);
    return res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
