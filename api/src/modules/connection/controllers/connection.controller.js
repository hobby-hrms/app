module.exports.testConnection = (req, res) => {
  return res.responder(200, "CONNECTION_OK")
}