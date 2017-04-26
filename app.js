navigator.webkitGetUserMedia({video: true},
  function(stream) {
    document.getElementById('camera').src = URL.createObjectURL(stream);
  },
  function() {
    alert('could not connect stream');
  }
);

function writeImage(name, data) {
    var fs = require("fs");

    //strip the data:image/jpeg;base64, off of the front of the image
    var match = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
    var dataBuffer = new Buffer(match[2], 'base64');

    fs.writeFile(name, dataBuffer, function(err){
        if (err) {
            return console.log(err);
        }

        console.log("Beginning face prediction");
        getPrediction();

    })
}

function getPrediction() {
  var spawn = require('child_process').spawn;
  var file = "/home/bpsizemore/facial-recognition/predict_face.py"
  var args = ["/usr/share/OpenCV/haarcascades/haarcascade_frontalface_default.xml",
    "/home/bpsizemore/facerec-login/image.png"]

  var result = '';
  var child = spawn(file, args);

  child.stdout.on('data', (data) => {
    result = `${data}`;
    console.log(result);
    //Navigate to new Electron page and prompt for accuracy in the predition.
  });

}

function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

function getImage() {
    'use strict';
    var video = document.querySelector('video')
        , canvas;

    /**
     *  generates a still frame image from the stream in the <video>
     *  appends the image to the <body>
     */
    function takeSnapshot() {
        var img = document.querySelector('img') || document.createElement('img');
        var context;
        var width = video.offsetWidth
            , height = video.offsetHeight;

        canvas = canvas || document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, width, height);

        img.src = canvas.toDataURL('image/png');
        writeImage("/home/bpsizemore/facerec-login/image.png", img.src);

    }

    // use MediaDevices API
    // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    if (navigator.mediaDevices) {
        // access the web cam
        navigator.mediaDevices.getUserMedia({video: true})
        // permission granted:
            .then(function(stream) {
                video.src = window.URL.createObjectURL(stream);
                video.addEventListener('click', takeSnapshot);
            })
            // permission denied:
            .catch(function(error) {
                document.body.textContent = 'Could not access the camera. Error: ' + error.name;
            });
    }
}
