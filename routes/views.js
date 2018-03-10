module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('home');
  });

  app.get('/s', function(req, res) {
    res.render('saved');
  });

}
