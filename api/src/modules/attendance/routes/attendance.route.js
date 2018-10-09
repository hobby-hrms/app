module.exports = app => {
  app.route('/api/attendance').get((req, res) => {
    return res.responder(200, 'GET attendance')
  })
}