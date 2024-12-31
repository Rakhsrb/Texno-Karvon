export function sendError(res) {
  return res.status(500).json({ message: "Server error" });
}
