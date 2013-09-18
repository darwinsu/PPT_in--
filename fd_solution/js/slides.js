require(['order!../slide_config', 'order!modernizr.custom.45394',
         'order!prettify/prettify', 'order!hammer', 'order!slide-controller',
         'order!slide-deck', '/socket.io/socket.io.js', './jquery-1.9.1.min.js'], function(someModule) {
    var socket = io.connect('http://192.168.57.103:9999');
    var total = slidedeck.slides.length;
    socket.emit('total', {total: total});
    socket.on('page', function (data) {
        slidedeck.loadSlide(data.page);
    });

    $('#btn1').click(function() {

    });
});
