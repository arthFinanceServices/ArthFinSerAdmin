// controllers/logout.controllers.js
function logout(req, res) {
  res.clearCookie("token", {
    path: "/",
  });
  return res.status(200).json({ message: "Logged out successfully" });
}

module.exports = { logout };
