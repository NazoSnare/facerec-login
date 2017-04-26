navigator.webkitGetUserMedia({video: true},
  function(stream) {
    document.getElementById('camera').src = URL.createObjectURL(stream);
  },
  function() {
    alert('could not connect stream');
  }
);

/* This function will call the facial recognition software
   and return details about the results.
 */
function recognizePhoto(photo) {

}

function testwrite(name, data) {
    var fs = require("fs");

    fs.writeFile(path, data, function(err){
        if (err) {
            return console.log(err);
        }

        console.log("Successfully wrote " + filename);
    })
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
        document.body.appendChild(img);
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
