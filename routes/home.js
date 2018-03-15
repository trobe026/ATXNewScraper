var db = require('../models');

module.exports = function(app) {
  // Retrives articles from db to be displayed on page. Sorted by _id desc to always show the most recent article, limit to the last 60
  app.get('/', function(req, res) {
    db.Headline.find({}).sort('-_id').limit(60)
      .then(function(dbStory) {
        var hbjObject = {
          articles: dbStory
        }
        res.render('home', hbjObject);
        // console.log(dbStory);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  // Change saved value to True in db so article will display on saved.handlebars
  app.put('/stories/:id', function(req, res) {
    db.Headline.update({
      _id: req.params.id
    },
    {
      saved: req.body.saved
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err)
    });
  });
}
