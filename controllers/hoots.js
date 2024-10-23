const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hoots = await Hoot.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(hoots);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:hootId", async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );

    updatedHoot._doc.author = req.user;

    res.status(200).json(updatedHoot);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:hootId", async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.status(200).json(deletedHoot);
  } catch (error) {
    res.status(500).json(error);
  }
});
