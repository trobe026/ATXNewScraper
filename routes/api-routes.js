var request = require("request");
var db = require('../models');
var cheerio = require("cheerio");


module.exports = function(app) {
  app.get('/scrape', function(req, res) {
    request('https://kxan.com', function(err, resp, html) {
      var $ = cheerio.load(html);
      var results = {};
      $(".media-object").each(function(i, element) {
        results.title = $(element).find('.entry-title').children('a').text();
        results.body = $(element).children('.entry-summary').children('p').text();
        results.link = $(element).find('.entry-title').children('a').attr('href');

        db.Headline.create(results)
        .then(function(dbStory) {
          // console.log(dbStory);
        })
        .catch(function(err) {
          return res.json(err)
        });
      });
      res.redirect('/');
    });
  });

  app.get('/', function(req, res) {
    db.Headline.find({})
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


    app.get('/s', function(req, res) {
      db.Headline.find({})
        .then(function(dbStory) {
          var hbjObject = {
            articles: dbStory
          }
          res.render('saved', hbjObject);
          // console.log(dbStory);
        })
        .catch(function(err) {
          res.json(err);
        });
    });

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

    app.get("/stories/:id", function(req, res) {
      db.Headline.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbStory) {
          // var hbsObject = {
          //   notes: dbStory
          // }
          res.json(dbStory);
          // res.render('saved', hbsObject );
          // console.log(dbStory);
          // console.log(hbsObject);
        })
        .catch(function(err) {
          res.json(err);
        });
    });

    app.post('/stories/:id', function(req, res) {
      console.log(req.body);
      db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Headline.findOneAndUpdate({ _id: req.params.id },
        { note: dbNote._id }, { new: true });
      })
      .then(function(dbStory) {
        // console.log(dbStory)
        res.json(dbStory);
      })
      .catch(function(err) {
        res.json(err);
      });
    });

}
