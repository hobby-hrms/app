module.exports = app => {
  app.route('/api/claim').get((req, res) => {
    return res.responder(200, 'GET Claim')
  })
}