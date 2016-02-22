DefineModule('demo', function (require) {
    var Timer = require('utils/timer');

    var Model = DefineClass({
        constructor: function () {
        },

        getVertices: function () {
            return new Float32Array(this.vertices);
        },

        getColors: function () {
            return new Float32Array(this.colors);
        }
    });

    var BoidModel = DefineClass({
        vertices: [-1, -1, 0, -1, 1, 0, 2, 0, 0],
        colors: [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    });

    var Boid = DefineClass({
        constructor: function (position, vector, velocity) {
            this.position = position;
            this.vector = vector;
        },

        getVertices: function () {
            return new Float32Array(this.vertices);
        },
    });

    var Demo = DefineClass({
        constructor: function (gfx) {
            this.gfx = gfx;
            this.objects = [];
        },

        run: function () {
            console.log('this is where things would start happening');
        }
    });

    return Demo;
});
