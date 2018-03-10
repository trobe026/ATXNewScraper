var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();
var databaseUrl = 'atxnews';
var collections = ["scrapedNews"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(err) {
  console.log("Database Error:", error);
});
var results = [];

app.get("/scrape", function(req, res) {
  // request("https://kxan.com/", function(err, resp, html) {
  //   var $ = cheerio.load(html);
    // $('article').each(function(i, element) {
    //   var title = $(element).find('.entry-title').children('a').attr('rel');
    //   var body = $(element).find('.entry-summary').children('p').text();
    //   var imgUrl = $(element).find('figure').find('a').attr(href);
    //   results.push({
    //     title: title,
    //     body: body,
    //     imgUrl: imgUrl
    //   });
    // });
    // console.log(results)
  // });
});
request("https://kxan.com/", function(err, resp, html) {
  var $ = cheerio.load(html);
$('.media-object').each(function(i, element) {
  var title = $(element).find('.entry-title').children('a').text();
  var body = $(element).children('.entry-summary').children('p').text();
  var link = $(element).find('.entry-title').children('a').attr('href');
  results.push({
    title: title,
    body: body,
    link: link
    });
  });
  console.log(results);
});
