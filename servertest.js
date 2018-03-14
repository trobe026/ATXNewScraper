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
request("http://www.kxan.com/", function(err, resp, html) {
  // console.log(html)
  var $ = cheerio.load(html);
$('#p_p_id_56_INSTANCE_3234_ li').each(function(i, element) {
  var imgUrl = $(element).find('figure').attr('style');
  test2 = imgUrl.replace('background-image: url(',' ').replace(')',' ').replace(/\"/gi, " ");
  test3 = imgUrl.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')
  test = imgUrl.replace("'background-image: url('","").replace(")';","").replace(/\"/gi, "");
  // console.log(imgUrl)
  // console.log(test2)
  // console.log(test3)

  var img = test3;
  var title = $(element).find('.headline').children('a').text();
  var body = $(element).find('.headline-wrapper').children('p').text();
  var link = $(element).find('.image-wrapper').children('a').attr('href');
  if (body === '') {
    body = "Whoops! Looks like this article has no body. Click the link!"
  }
  results.push({
    title: title,
    body: body,
    link: 'http://www.kxan.com' + link,
    img: img
    });
  });
  console.log(results);
});
