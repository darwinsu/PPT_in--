(function() {
    var development = true;
    var plugins = ['shim'];
    var map = [];
    if(location.href.indexOf('development') > 0 || location.search.indexOf('seajs-debug') > 0) {
        development = true;
    }
    if(development) { // 开发模式
        plugins.push('nocache');
        var dist = 'public/js/dist/';
        var src = 'js/'
        map.push(function(url) {
            if(url.indexOf(dist) > 0) {
                console.log(url);
                url = url.replace(dist, src);
                console.log(url);
            }
            return url;
        });
    }

    seajs.development = development;
    seajs.config({
        plugins: plugins,
        map: map,
        alias: {
            jquery: {
                src: 'jquery/jquery-1.9.1.min.js',
                exports: 'jQuery'
            }
        }
    });
})();