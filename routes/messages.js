const { Message } = require("../models/message");
const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  // return all messages.....
  try {
    const messages = await Message.find();
    if (messages) {
      res.json({ data: messages });
    } else {
      res.status(404).json({ message: "Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:id", auth, async (req, res) => {
  // findBYId and return
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      res.json({ data: message });
    } else {
      res.status(404).json({ message: "Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sendMessage", async (req, res) => {
  //save the  message in the DB
  try {
    const message = new Message(
      _.pick(req.body, ["from", "to", "content", "status", "created_at"])
    );
    await message.save();
    res.json({ message: "message has been sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/read/:id", auth, async (req, res) => {
  //findByid and read the text and save into the DB , set status to true of read..
  try {
    const message = await Message.findById({ _id: req.params.id });
    if (!message) {
      res.status(404).json({ message: `message not found` });
    } else {
      await Message.findByIdAndUpdate(
        req.params.id,
        { $set: { read: true } },
        { new: true }
      );
      res.json({ message: "Message status read to true" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  // findById and remove the text... from DB
  try {
    const message = await Message.findByIdAndRemove(req.params.id);
    if (!message) {
      res.status(404).json({ notFound: "No message found" });
    } else {
      res.json({ message: "message has been deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
