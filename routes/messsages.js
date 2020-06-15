const { Message } = require("./models/message");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  // return all messages.....
});
router.get("/:id", auth, async (req, res) => {
  // findBYId and return
});

router.post("/sendMessage", async (req, res) => {
  //save the  message in the DB
});

router.put("/read/:id", auth, async (req, res) => {
  //findByid and read the text and save into the DB , set status to true of read..
});

router.delete("/:id", auth, async (req, res) => {
  // findById and remove the text... from DB
});

module.exports = router;
