DefineModule('demo', function (require) {
    var Timer = require('utils/timer');

    var Boid = DefineClass({
        constructor: function (position, vector, velocity) {
            this.position = position;
            this.vector = vector;
        },
    });
});
