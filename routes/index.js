var express = require('express');
var router = express.Router();
const request = require('request');
const s3 = require('../config/s3.config.js');


router.get('/', function(req, res, next) {
  res.render('video');
});

router.get('/notifications', function(req, res, next) {
  url = 'https://tgmdpuq1ai.execute-api.us-east-1.amazonaws.com/crud/alertnotifications';

  request(url, {json : true}, (err, response, body) => {
    if (err) { return console.log(err); }
    //let notificationList = body;

    var notificationList = body.slice(0);
    notificationList.sort(function(a,b) {
        var x = a.usuario;
        var y = b.usuario;
        return x > y ? 1 : x < y ? -1 : 0;
    });

    res.render('notifications', {notificationList : notificationList});
  });  
});

router.get('/information', function(req, res, next) {
  res.render('information');
});

router.get('/:filename', function(req, res) {
  const s3Client = s3.s3Client;
  const params = s3.downloadParams;
  const hbjs = require('handbrake-js')
  
  params.Key = req.params.filename;
 
  // var file = require('fs').createWriteStream('public/assets/video/video.avi');

  // s3Client.getObject(params)
  //   .createReadStream()
  //     .on('error', function(err){
  //       res.status(500).json({error:"Error -> " + err});
  //   }).pipe(file);

    // hbjs.spawn({ input: 'public/assets/video/video.avi', output: 'public/assets/video/video.mp4' })
    // .on('error', err => {
    //   // invalid user input, no video found etc
    // })
    // .on('progress', progress => {
    //   console.log(
    //     'Percent complete: %s, ETA: %s',
    //     progress.percentComplete,
    //     progress.eta
    //   )
    // })

    res.render('notification_video')
});
 
module.exports = router;
