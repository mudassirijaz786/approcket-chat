const router = require("express").Router();
const auth = require("../middleware/auth");
const { Room } = require("./models/room");

router.get("/", auth, async (req, res) => {
  // return all rooms.....
});
router.get("/:id", auth, async (req, res) => {
  // findBYId and return
});

router.post("/", auth, async (req, res) => {
  // create new room and save into the DB
});
router.put("/joinRoom/:id", auth, async (req, res) => {
  // findBByidandupdate and update the users in the arrays as did ealrier like in the addSkill etc...
});

router.delete("/:id", async (req, res) => {
  // findById and remove from the DB [Room]
});
router.put("/leaveRoom/:id", auth, async (req, res) => {
  // findByid and remove the partcular user from the room [remove from the users array as done in the removeSkill]
});
router.post("/sendMessage/:id", auth, async (req, res) => {
  // find by id and add message to messages array in the room
});

// router.post
module.exports = router;
