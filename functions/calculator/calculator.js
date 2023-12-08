//Class for operators
function Operator(input) {
    this.operator = input;
    if (!input) {
        console.log("Operator has no input.");
    }

    this.solve = function (segment1, segment2, x) {
        var v1 = segment1.coefficient;
        if (segment1.type == "variable") {
            v1 = x;
        }
        var v2 = segment2.coefficient;
        if (segment2.type == "variable") {
            v2 = x;
        }
        if (this.operator == "+") {
            return new Segment(v1 + v2);
        } else if (this.operator == "-") {
            return new Segment(v1 - v2);
        } else if (this.operator == "*") {
            return new Segment(v1 * v2);
        } else if (this.operator == "/") {
            return new Segment(v1 / v2);
        } else if (this.operator == "^") {
            return new Segment(Math.pow(v1, v2));
        }
    };
}


//One point on a graph
function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}


//MathFunction to create graphs
function Graph(value, width, height, rangeX, rangeY) {
    var autoRange = false;

    //Default params
    if (rangeX === undefined) {
        rangeX = 10;
    }
    if (rangeY === undefined) {
        autoRange = true;
    }

    //Properties
    this.expression = new Segment(value);
    this.points = [];
    this.canvas = document.createElement("canvas");
    this.canvas.width = width || 400;
    this.canvas.height = height || 400;
    this.min = undefined;
    this.max = undefined;
    this.x1 = 0 - Math.abs(rangeX);
    this.x2 = 0 + Math.abs(rangeX);
    this.y1 = 0 - Math.abs(rangeY);
    this.y2 = 0 + Math.abs(rangeY);
    var startMouse = new Point(0, 0);
    var mousePos = new Point(0, 0);
    var timer = 0;
    var stage = 0;
    var img = 0;
    var magnitudeX = 0;
    var magnitudeY = 0;

    //Gets minimum y value in the set of points
    this.getMin = function () {
        if (this.min === undefined) {
            if (this.points.length > 0) {
                var min = this.points[0].y;
                for (var i = 1; i < this.points.length; i++) {
                    if (this.points[i].y < min) min = this.points[i].y;
                }
                this.min = min;
                return min;
            } else {
                return 0;
            }
        } else {
            return this.min;
        }
    };

    //Gets maximum y value in the set of points
    this.getMax = function () {
        if (this.max === undefined) {
            if (this.points.length > 0) {
                var max = this.points[0].y;
                for (var i = 1; i < this.points.length; i++) {
                    if (this.points[i].y > max) max = this.points[i].y;
                }
                this.max = max;
                return max;
            } else {
                return 0;
            }
        } else {
            return this.max;
        }
    };

    //Updates the points and graph
    this.update = function () {
        var accuracy = (this.x2 - this.x1) / this.canvas.width;
        this.points = [];
        for (var i = this.x1; i <= this.x2; i += accuracy) {
            this.points.push(new Point(i, this.expression.result(i)));
        }

        if (autoRange) {
            if (this.getMax() - this.getMin() > 100000) {
                this.y1 = -100;
                this.y2 = 100;
            } else {
                this.y1 = this.getMin() - 5;
                this.y2 = this.getMax() + 5;
            }
            autoRange = false;
        }

        magnitudeX = Math.ceil(Math.log(this.x2 - this.x1));
        magnitudeY = Math.ceil(Math.log(this.y2 - this.y1));

        this.redraw();
    };

    var drawAxes = function (_x1, _x2, _y1, _y2, redraw) {
        stage.strokeStyle = "#bdc3c7";
        stage.fillStyle = "#bdc3c7";
        var limit = 0;
        var i = 0;

        if (0 >= _x1 - 30 && 0 <= _x2 + 30) {
            stage.lineWidth = 2;
            stage.beginPath();
            stage.moveTo(this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width, 0);
            stage.lineTo(this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width, this.canvas.height);
            stage.closePath();
            stage.stroke();
            stage.textAlign = "right";
            stage.textBaseline = "middle";

            stage.lineWidth = 1;
            limit = (Math.abs(_y2) > Math.abs(_y1)) ? Math.abs(_y2) : Math.abs(_y1);
            for (i = 0; i <= limit; i += Math.pow(10, Math.floor(Math.log(_y2 - _y1) / Math.LN10)) / 4) {
                if (i === 0) continue;
                if (i <= _y2 + 50) {
                    if (redraw || (i >= this.y2 - 50)) {
                        stage.beginPath();
                        stage.moveTo(this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width - 5, this.canvas.height - ((i - _y1) / (_y2 - _y1)) * this.canvas.height);
                        stage.lineTo(this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width + 5, this.canvas.height - ((i - _y1) / (_y2 - _y1)) * this.canvas.height);
                        stage.closePath();
                        stage.stroke();
                        stage.fillText("" + (Math.round(i * 100) / 100), this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width - 8, this.canvas.height - ((i - _y1) / (_y2 - _y1)) * this.canvas.height);
                    }
                }

                if (i >= _y1 - 50) {
                    if (redraw || (-i <= this.y1 + 50)) {
                        stage.beginPath();
                        stage.moveTo(this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width - 5, this.canvas.height - ((-i - _y1) / (_y2 - _y1)) * this.canvas.height);
                        stage.lineTo(this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width + 5, this.canvas.height - ((-i - _y1) / (_y2 - _y1)) * this.canvas.height);
                        stage.closePath();
                        stage.stroke();
                        stage.fillText("" + (Math.round(-i * 100) / 100), this.canvas.width / 2 - (((_x2 + _x1) / 2) / (_x2 - _x1)) * this.canvas.width - 8, this.canvas.height - ((-i - _y1) / (_y2 - _y1)) * this.canvas.height);
                    }
                }
            }
        }

        //Draw the x axis if it is in the view
        if (0 >= _y1 - 50 && 0 <= _y2 + 50) {
            stage.lineWidth = 2;
            stage.beginPath();
            stage.moveTo(0, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height);
            stage.lineTo(this.canvas.width, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height);
            stage.closePath();
            stage.stroke();
            stage.textAlign = "center";
            stage.textBaseline = "top";

            stage.lineWidth = 1;
            limit = (Math.abs(_x2) > Math.abs(_x1)) ? Math.abs(_x2) : Math.abs(_x1);
            for (i = 0; i <= limit; i += Math.pow(10, Math.floor(Math.log(_x2 - _x1) / Math.LN10)) / 4) {
                if (i === 0) continue;
                if (i <= _x2 + 50) {
                    if (redraw || (i >= this.x2 - 50)) {
                        stage.beginPath();
                        stage.moveTo(((i - _x1) / (_x2 - _x1)) * this.canvas.width, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height - 5);
                        stage.lineTo(((i - _x1) / (_x2 - _x1)) * this.canvas.width, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height + 5);
                        stage.closePath();
                        stage.stroke();
                        stage.fillText("" + (Math.round(i * 100) / 100), ((i - _x1) / (_x2 - _x1)) * this.canvas.width, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height + 8);
                    }
                }

                if (i >= _x1 - 50) {
                    if (redraw || (-i <= this.x1 + 50)) {
                        stage.beginPath();
                        stage.moveTo(((-i - _x1) / (_x2 - _x1)) * this.canvas.width, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height - 5);
                        stage.lineTo(((-i - _x1) / (_x2 - _x1)) * this.canvas.width, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height + 5);
                        stage.closePath();
                        stage.stroke();
                        stage.fillText("" + (Math.round(-i * 100) / 100), ((-i - _x1) / (_x2 - _x1)) * this.canvas.width, this.canvas.height / 2 + (((_y2 + _y1) / 2) / (_y2 - _y1)) * this.canvas.height + 8);
                    }
                }
            }
        }
    }.bind(this);

    //Updates the canvas
    this.redraw = function () {
        if (this.points.length > 1) {
            stage.clearRect(0, 0, this.canvas.width, this.canvas.height);
            stage.lineCap = "round";

            var offsetY = -this.y1;

            drawAxes(this.x1, this.x2, this.y1, this.y2, true);

            //Draw all the points
            stage.strokeStyle = "#2980b9";
            stage.lineWidth = 1;
            stage.beginPath();
            stage.moveTo(0, this.canvas.height - ((this.points[0].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height);
            for (var i = 1; i < this.points.length; i++) {
                if (Math.abs((this.canvas.height - ((this.points[i].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height) - (this.canvas.height - ((this.points[i - 1].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height)) <= this.canvas.height) {
                    stage.lineTo((i / this.points.length) * this.canvas.width, this.canvas.height - ((this.points[i].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height);
                }
                stage.moveTo((i / this.points.length) * this.canvas.width, this.canvas.height - ((this.points[i].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height);
            }
            stage.closePath();
            stage.stroke();

            img = stage.getImageData(0, 0, this.canvas.width, this.canvas.height);
        } else {
            console.log("Not enough points to graph.");
        }
    };

    this.setRange = function (_x1, _x2, _y1, _y2) {
        this.x1 = _x1;
        this.x2 = _x2;
        this.y1 = _y1;
        this.y2 = _y2;
        this.update();
    };

    var getMousePos = function (evt) {
        var rect = this.canvas.getBoundingClientRect();
        var root = document.documentElement;

        // return relative mouse position
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;

        return new Point(mouseX, mouseY);
    }.bind(this);

    var startDrag = function (event) {
        document.addEventListener("mousemove", dragMouse, false);
        document.addEventListener("mouseup", endDrag, false);
        this.canvas.removeEventListener("mouseover", startMouseOver, false);
        this.canvas.removeEventListener("mousemove", moveMouse, false);
        startMouse = getMousePos(event);
    }.bind(this);

    var redrawLine = function () {
        var offsetX = ((mousePos.x - startMouse.x) / this.canvas.width) * (this.x2 - this.x1);
        var offsetY = ((mousePos.y - startMouse.y) / this.canvas.height) * (this.y2 - this.y1);
        this.setRange(this.x1 - offsetX, this.x2 - offsetX, this.y1 + offsetY, this.y2 + offsetY);
        startMouse = mousePos;
    }.bind(this);

    var dragMouse = function (event) {
        stage.clearRect(0, 0, this.canvas.width, this.canvas.height);
        mousePos = getMousePos(event);
        var newx1 = this.x1 - ((mousePos.x - startMouse.x) / this.canvas.width) * (this.x2 - this.x1);
        var newx2 = this.x2 - ((mousePos.x - startMouse.x) / this.canvas.width) * (this.x2 - this.x1);
        var newy1 = this.y1 + ((mousePos.y - startMouse.y) / this.canvas.height) * (this.y2 - this.y1);
        var newy2 = this.y2 + ((mousePos.y - startMouse.y) / this.canvas.height) * (this.y2 - this.y1);

        if (Math.abs(newx1 - this.x1) > this.canvas.width / 2 || Math.abs(newy1 - this.y1) > this.canvas.height / 2) {
            redrawLine();
        } else {
            drawAxes(newx1, newx2, newy1, newy2, false);
            stage.putImageData(img, mousePos.x - startMouse.x, mousePos.y - startMouse.y);
        }


    }.bind(this);

    var endDrag = function (event) {
        document.removeEventListener("mousemove", dragMouse, false);
        document.removeEventListener("mouseup", endDrag, false);
        this.canvas.addEventListener("mouseover", startMouseOver, false);
        this.canvas.addEventListener("mousemove", moveMouse, false);
        mousePos = getMousePos(event);

        var offsetX = ((mousePos.x - startMouse.x) / this.canvas.width) * (this.x2 - this.x1);
        var offsetY = ((mousePos.y - startMouse.y) / this.canvas.height) * (this.y2 - this.y1);
        this.setRange(this.x1 - offsetX, this.x2 - offsetX, this.y1 + offsetY, this.y2 + offsetY);
    }.bind(this);

    var startMouseOver = function (event) {
        this.canvas.addEventListener("mousemove", moveMouse, false);
        this.canvas.addEventListener("mouseout", endMouseOver, false);
    }.bind(this);

    var moveMouse = function (event) {
        stage.clearRect(0, 0, this.canvas.width, this.canvas.height);
        stage.putImageData(img, 0, 0);
        mousePos = getMousePos(event);
        var offsetY = -this.y1;

        //Draw the coordinate
        stage.fillStyle = "#2980b9";
        stage.beginPath();
        stage.arc(mousePos.x, this.canvas.height - ((this.points[Math.round(mousePos.x / this.canvas.width * this.points.length)].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height, 4, 0, 2 * Math.PI);
        stage.closePath();
        stage.fill();
        stage.fillStyle = "#000";
        stage.strokeStyle = "#FFF";
        stage.lineWidth = 4;
        stage.textBaseline = "alphabetic";
        var txt = "(" + (Math.round(this.points[Math.round(mousePos.x / this.canvas.width * this.points.length)].x * 100) / 100).toFixed(2) + ", " + (Math.round(this.points[Math.round(mousePos.x / this.canvas.width * this.points.length)].y * 100) / 100).toFixed(2) + ")";

        if (mousePos.x < stage.measureText(txt).width / 2 + 2) {
            stage.textAlign = "left";
        } else if (mousePos.x > this.canvas.width - stage.measureText(txt).width / 2 - 2) {
            stage.textAlign = "right";
        } else {
            stage.textAlign = "center";
        }
        stage.strokeText(txt, mousePos.x, -10 + this.canvas.height - ((this.points[Math.round(mousePos.x / this.canvas.width * this.points.length)].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height);
        stage.fillText(txt, mousePos.x, -10 + this.canvas.height - ((this.points[Math.round(mousePos.x / this.canvas.width * this.points.length)].y + offsetY) / (this.y2 - this.y1)) * this.canvas.height);
    }.bind(this);

    var endMouseOver = function (event) {
        this.canvas.removeEventListener("mousemove", moveMouse, false);
        this.canvas.removeEventListener("mouseout", endMouseOver, false);
        stage.clearRect(0, 0, this.canvas.width, this.canvas.height);
        stage.putImageData(img, 0, 0);
    }.bind(this);

    //Returns the canvas element
    this.getCanvas = function () {
        return this.canvas;
    };

    //If canvas drawing is supported
    if (this.canvas.getContext) {

        //Get the canvas context to draw onto
        stage = this.canvas.getContext("2d");
        stage.font = "12px sans-serif";
        this.canvas.style.backgroundColor = "#FFF";

        //Make points
        this.update();

        this.canvas.addEventListener("mousedown", startDrag, false);
        this.canvas.addEventListener("mouseover", startMouseOver, false);
    } else {
        console.log("Canvas not supported in this browser.");
        this.canvas = document.createElement("div");
        this.canvas.innerHTML = "Canvas is not supported in this browser.";
    }
}

//Module for input checking and parsing
var XCalc = (function () {
    var worker = {};

    //Checks to see if brackets are properly nested in a string
    worker.properBrackets = function (value) {
        var openBrackets = 0;
        for (var i = 0; i < value.length; i++) {
            if (value.substr(i, 1) == "(") openBrackets++;
            if (value.substr(i, 1) == ")") openBrackets--;
        }
        return openBrackets === 0;
    };

    //Creates a new Section for an expression
    worker.createExpression = function (value) {
        if (this.properBrackets(value)) {
            return new Segment(value);
        } else {
            return 0;
        }
    };

    worker.graphExpression = function (value, width, height, rangeX, rangeY) {
        return new Graph(value, width, height, rangeX, rangeY);
    };

    return worker;
}());

function simplifyText(event) {
    var input = document.getElementById("input").value;
    if (XCalc.properBrackets(input)) {
        document.getElementById("wrapper").className = "";
        var timer = setTimeout(function () {
            var graph = XCalc.graphExpression(input, 400, 400);
            document.getElementById("result").innerHTML = "";
            document.getElementById("result").appendChild(graph.getCanvas());
            document.getElementById("wrapper").className = "solved";
        }, 800);
    } else {
        document.getElementById("result").innerHTML = "<div class='error'>Error: Improperly nested brackets. Remember to only use round brackets and close all opened brackets.</div>";
    }
}

window.onload = function () {
    document.getElementById("simplify").addEventListener("click", simplifyText);
    simplifyText();
};