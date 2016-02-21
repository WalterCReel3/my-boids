DefineModule('gfx', function (require) {
    return DefineClass({
        constructor: function Gfx(option) {
            this.canvas = this.makeCanvas();
            this.gl = this.makeGlContext(this.canvas);
            this.initGL();
        },

        makeCanvas: function() {
            return document.getElementById("glcanvas");
        },

        makeGlContext: function(canvas) {
            var gl;
            try {
                gl = canvas.getContext("webgl");
            } catch(e) {
                console.log(e);
            }

            // If we don't have a GL context, give up now
            if (!gl) {
                throw("Unable to initialize WebGL. Your browser may not support it.");
            }

            return gl
        },

        initGL: function() {
            var gl = this.gl;
            gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
            gl.clearDepth(1.0);                 // Clear everything
            gl.enable(gl.DEPTH_TEST);           // Enable depth testing
            gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
    
            // Initialize the shaders; this is where all the lighting for the
            // vertices and so forth is established.
            this.initShaders();

            // Here's where we call the routine that builds all the objects
            // we'll be drawing.
            // this.initBuffers();

            // Set up to draw the scene periodically.
            // function animFrame() {
            //     drawScene();
            //     requestAnimationFrame(animFrame);
            // }
            // requestAnimationFrame(animFrame);
        },

        getShader: function(id) {
            var gl = this.gl;
            var shaderScript = document.getElementById(id);
            
            // Didn't find an element with the specified ID; abort.
            if (!shaderScript) {
                return null;
            }
            
            // Walk through the source element's children, building the
            // shader source string.
            var theSource = "";
            var currentChild = shaderScript.firstChild;
            
            while(currentChild) {
                if (currentChild.nodeType == 3) {
                    theSource += currentChild.textContent;
                }
                currentChild = currentChild.nextSibling;
            }
            
            // Now figure out what type of shader script we have,
            // based on its MIME type.
            
            var shader;
            if (shaderScript.type == "x-shader/x-fragment") {
                shader = gl.createShader(gl.FRAGMENT_SHADER);
            } else if (shaderScript.type == "x-shader/x-vertex") {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } else {
                return null;  // Unknown shader type
            }
            
            // Send the source to the shader object
            gl.shaderSource(shader, theSource);
            
            // Compile the shader program
            gl.compileShader(shader);
            
            // See if it compiled successfully
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            }
            
            return shader;
        },

        initShaders: function() {
            var gl = this.gl;
            var fragmentShader = this.getShader("shader-fs");
            var vertexShader = this.getShader("shader-vs");
            
            // Create the shader program
            shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragmentShader);
            gl.linkProgram(shaderProgram);
            
            // If creating the shader program failed, alert
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                throw("Unable to initialize the shader program.");
            }
            
            gl.useProgram(shaderProgram);
            
            var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
            gl.enableVertexAttribArray(vertexPositionAttribute);
            
            var vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
            gl.enableVertexAttribArray(vertexColorAttribute);
        },

        initBuffers: function() {
        }
    });
});
