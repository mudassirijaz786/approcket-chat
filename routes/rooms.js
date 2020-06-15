const router = require("express").Router();
const auth = require("../middleware/auth");
const { Room } = require("../models/room");

router.get("/", auth, async (req, res) => {
  try {
    const rooms = await Room.find();
    if (rooms) {
      res.json({ data: rooms });
    } else {
      res.status(404).json({ message: "Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json({ data: room });
    } else {
      res.status(404).json({ message: "Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", auth, async (req, res) => {
  // create new room and save into the DB
  //   try {
  const room = new Room();
  await room.save();
  res.json({ message: "room has been saved successfully" });
  //   } catch (error) {
  res.status(500).json({ error: "Internal Server Error" });
  //   }
});
router.put("/joinRoom/:id", auth, async (req, res) => {
  // findBByidandupdate and update the users in the arrays as did ealrier like in the addSkill etc...
  try {
    const found = await Room.findOne({ _id: req.params.id });
    if (!found) {
      res.status(404).json({ message: "Room not found" });
    } else {
      await Room.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            members: req.body,
          },
        },
        { new: true }
      );
      res.json({ message: "Room is joined successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  // findById and remove from the DB [Room]
  try {
    const room = await Room.findByIdAndRemove(req.params.id);
    if (!room) {
      res.status(404).json({ notFound: "No room found" });
    } else {
      res.json({ message: "room has been deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/leaveRoom/:id", auth, async (req, res) => {
  // findByid and remove the partcular user from the room [remove from the users array as done in the removeSkill]
  try {
    const { _id } = req.body;
    const found = await Room.findOne({ _id: req.params.id });
    if (!found) {
      res.status(404).json({ message: "room Not Found!" });
    } else {
      await Profile.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: {
            skills: { _id: _id },
          },
        },
        { new: true }
      );
      res.json({ message: "Skill has been pulled out successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/sendMessage/:id", auth, async (req, res) => {
  // find by id and add message to messages array in the room
  try {
    const found = await Room.findOne({ _id: req.params.id });
    if (!found) {
      res.status(404).json({ message: "Room not found" });
    } else {
      await Room.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            messages: req.body,
          },
        },
        { new: true }
      );
      res.json({ message: "message added successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
<<<<<<< HEAD

// router.post
=======
>>>>>>> 6947944280b552901afd091146eb0b4fe3bd97f3
module.exports = router;
