var request = require("request");
var db = require('../models');
var cheerio = require("cheerio");


module.exports = function(app) {

  app.get('/scrape', function(req, res) {
    request('http://www.kxan.com', function(err, resp, html) {
      console.log(html);
      var $ = cheerio.load(html);
      var results = {};
      $('#p_p_id_56_INSTANCE_3234_ li').each(function(i, element) {
        var imgUrl = $(element).find('figure').attr('style');
        results.img = imgUrl.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
        results.title = $(element).find('.headline').children('a').text();
        results.body = $(element).find('.headline-wrapper').children('p').text();
        results.link = 'http://www.kxan.com' + $(element).find('.image-wrapper').children('a').attr('href');

        if (results.body === '') {
          results.body = "Whoops! Looks like this article has no body. Click the link!"
        }

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
        .populate("notes")
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
