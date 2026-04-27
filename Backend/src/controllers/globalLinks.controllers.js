const GlobalLink = require("../models/globalLinks.models");

/* ✅ Get all global links */
async function getGlobalLinks(req, res) {
  try {
    const links = await GlobalLink.find().sort({ createdAt: -1 });
    res.status(200).json({ data: links });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch global links" });
  }
}

/* ✅ Add */
async function addGlobalLink(req, res) {
  const { linkName, url, isActive } = req.body;

  if (!linkName || !url) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newLink = await GlobalLink.create({
    linkName,
    url,
    isActive: isActive ?? true,
    createdBy: req.user.email,
  });

  res.status(201).json({ data: newLink });
}

/* ✅ Update */
async function updateGlobalLink(req, res) {
  const updated = await GlobalLink.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ data: updated });
}

/* ✅ Delete */
async function deleteGlobalLink(req, res) {
  await GlobalLink.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}

module.exports = {
  getGlobalLinks,
  addGlobalLink,
  updateGlobalLink,
  deleteGlobalLink,
};