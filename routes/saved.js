var db = require('../models');

module.exports = function(app) {
  // diplay saved articles, sorted by first saved
    app.get('/s', function(req, res) {
      db.Headline.find({})
        .then(function(dbStory) {
          var hbjObject = {
            articles: dbStory
          }
          res.render('saved', hbjObject);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
// populate associated notes when article is clicked
    app.get("/stories/:id", function(req, res) {
      db.Headline.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function(dbStory) {
          res.json(dbStory);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
// associaties and creates a note for selected article
    app.post('/stories/:id', function(req, res) {
      console.log(req.body);
      db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Headline.findOneAndUpdate({ _id: req.params.id }, {$push: { notes: dbNote._id } }, { new: true });
      })
      .then(function(dbStory) {
        // console.log(dbStory)
        res.json(dbStory);
      })
      .catch(function(err) {
        res.json(err);
      });
    });
// deletes selected note
    app.put('/notes/:id', function(req, res) {
      console.log(req.params.id);
      db.Note.findOneAndRemove({
        _id: req.params.id
      })
      .then(function(deletedNote) {
        res.json(deletedNote);
      })
      .catch(function(err) {
        res.json(err);
      });
    });
}
