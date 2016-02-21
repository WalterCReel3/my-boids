DefineModule('main', function (require) {
    var Gfx = require('gfx');
    var Demo = require('demo');

    var gfx = new Gfx();
    console.log(gfx);

    // runLoop.addCallback(function (dtime) {
    // });

    document.addEventListener("visibilitychange", function () {
    });

    window.addEventListener("blur", function () {
    });

    window.addEventListener("focus", function () {
    });
});
