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
          console.log(dbStory);
        })
        .catch(function(err) {
          return res.json(err)
        });
      });
      res.send('scrape complete');
    });
  });

  app.get('/stories', function(req, res) {
    db.Headline.find({})
      .then(function(dbStory) {
        var hbjObject = {
          articles: dbStory
        }
        res.render('home', hbjObject);
        console.log(dbStory);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // $.getJSON("/articles", function(data) {
  //   var hbsObject = {
  //     articles: data
  //   };
  //   res.render("index", hbsObject);
  // });

}
