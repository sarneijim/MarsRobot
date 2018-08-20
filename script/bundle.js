(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Coordinates class

class Coordinates {
  // For limit the values x - limitX and y -limitY will be the same.
  constructor(x, y, limitX, limitY) {
    this.x = x;
    this.y = y;
    this.limitX = limitX;
    this.limitY = limitY;
  }
  // Check correct coordinates, positive and inside the limit.
  get checkCoordinates() {
    let check = true;
    const coord = [this.x, this.y];
    const limit = [this.limitX, this.limitY];
    coord.forEach((x, i) => {
      const num = +x;
      const reg = new RegExp('^\\d+$');
      if (num < 0 || num > limit[i] || reg.exec(x) == null) {
        check = false;
      }
    });
    if (check) {
      this.x = parseInt(this.x);
      this.y = parseInt(this.y);
      this.limitX = parseInt(this.limitX);
      this.limitY = parseInt(this.limitY);
    };
    return check;
  }
}

module.exports = Coordinates;

},{}],2:[function(require,module,exports){
// Generic function and user graph helpers

module.exports = {
  // Modulus work in positive and negative numbers.
  modulus: function (elem) {
    return ((elem % 4) + 4) % 4;
  },

  // Border are red when there is a mistake.
  checkedErrors: function (plateau, robot, route) {
    const arrayChecks = [plateau, robot, route];
    const arrayClasses = [plateauPosition, originPosition, routePosition];
    arrayChecks.forEach((check, i) => {
      if (check) {
        arrayClasses[i].classList.remove("bad");
      } else {
        arrayClasses[i].classList.add("bad");
      }
    });
  }
};


},{}],3:[function(require,module,exports){
const Coordinates = require('./coordinate.js');
const helper = require('./helper');

const robotAddedList = [];

// Robot class
class Robot extends Coordinates {
  constructor(x, y, limitX, limitY, direction, route) {
    super(x, y, limitX, limitY);

    this.direction = direction;
    this.route = route;
    // AuxDirection corresponds to the direction, but with numerical form
    this.auxDirection = 0;
  }
  get checkRobot() {
    // Validation of initial position inside the limit
    const checkLimitRobot = this.checkCoordinates;
    // Update auxDirection with Direction and check a validate position
    const checkDirectionRobot = this.checkDirection;
    // Check that position does not be occupied by another robot
    const checkUnoccupiedPosition = this.checkOccupied;
    return (checkLimitRobot && checkDirectionRobot && checkDirectionRobot && checkUnoccupiedPosition);
  }
  get add() {
    robotAddedList.push(this);
    return robotAddedList;
  }
  get checkDirection() {
    const options = ['N', 'S', 'E', 'W'];
    if (options.indexOf(this.direction) === -1) {
      return false;
    }
    switch (this.direction) {
      case 'N':
        this.auxDirection = 0;
        break;
      case 'E':
        this.auxDirection = 1;
        break;
      case 'S':
        this.auxDirection = 2;
        break;
      default:
        this.auxDirection = 3;
    }
    return true;
  }
  get checkOccupied() {
    let check = true;
    robotAddedList.forEach((elem) => {
      if (elem.x === this.x && elem.y === this.y) {
        check = false;
      }
    });
    return check;
  }
  get movementRobot() {
    // Check that route is available
    const checkRouteRobot = this.checkRoute;
    // Check that movement is available
    const checkMovement = this.checkMovement;
    return (checkRouteRobot && checkMovement);
  }
  get checkRoute() {
    let check = true;
    this.route.split('').forEach((shift) => {
      const options = ['L', 'R', 'M'];
      if (options.indexOf(shift) === -1) {
        check = false;
      }
    });
    return check;
  }
  get checkMovement() {
    let check = true;
    this.route.split('').forEach((shift) => {
      switch (shift) {
        case 'R':
          this.auxDirection += 1;
          // Mathematic function that made available modulus of negative numbers
          this.auxDirection = helper.modulus(this.auxDirection);
          break;
        case 'L':
          this.auxDirection -= 1;
          this.auxDirection = helper.modulus(this.auxDirection);
          break;
        case 'M':
          // The displacement depends on the direction
          switch (this.auxDirection % 4) {
            // North
            case 0:
              this.y += 1;
              break;
            // East
            case 1:
              this.x += 1;
              break;
            // South
            case 2:
              this.y -= 1;
              break;
            // West
            case 3:
              this.x -= 1;
              break;
            default:
              console.log("Internal error");
          }
          // The position is checked for each step
          check = check && this.checkCoordinates && this.checkOccupied;
          break;
        default:
          console.log("Internal error");
      }
    });
    return check;
  }
  get updateDirection() {
    switch (this.auxDirection) {
      case 0:
        this.direction = 'N';
        break;
      case 1:
        this.direction = 'E';
        break;
      case 2:
        this.direction = 'S';
        break;
      case 3:
        this.direction = 'W';
        break;
      default:
        console.log("Unexpected error");
    }
  }
}

module.exports = Robot;


},{"./coordinate.js":1,"./helper":2}],4:[function(require,module,exports){
const Coordinates = require('./coordinate.js');
const Robot = require('./robot.js');

var helper = require('./helper');

let movementButton = document.getElementById("movement");
let addButton = document.getElementById("add");
let resetButton = document.getElementById("reset");

let plateau = document.getElementById("plateau");
let finalPosition = document.getElementById('final');
let table = document.getElementById("robot-table");

let robotAddedList = [];


plateauPosition = document.getElementById('plateau');
originPosition = document.getElementById('origin');
routePosition = document.getElementById('route');

//Interface flow and validates

movementButton.addEventListener('click', () => {
  robot = initRobot();
  plateauValidation = checkLimit();
  robotValidation = robot.checkRobot;
  movementValidation = robot.movementRobot;
  helper.checkedErrors(plateauValidation, robotValidation, movementValidation);
  if(plateauValidation && robotValidation && movementValidation){
    robot.updateDirection;
    finalPosition.innerHTML = robot.x + " " + robot.y + " " + robot.direction
    addButton.classList.add("show");
  }else{
    finalPosition.innerHTML = "";
    addButton.classList.remove("show");
  }
});

addButton.addEventListener('click', () => {
  addButton.classList.remove("show");
  robotAddedList = robot.add;
  debugger;
  plateau.disabled = true;
  var row = table.insertRow(1);
  row.insertCell(0).innerHTML = robotAddedList.length;
  row.insertCell(1).innerHTML = finalPosition.innerHTML;
});

resetButton.addEventListener('click', () => {
  window.location.reload(false);
})

// Convert input in a Object type Coordinates
function checkLimit(){
  limit = document.getElementById("plateau").value.split(" ");
  limit[1] = limit.slice(1, limit.length).join();
  limitObject = new Coordinates(limit[0], limit[1], limit[0], limit[1]);
  return limitObject.checkCoordinates;
}

// Convert inputs in a Object type Robot
function initRobot(){
  originRobot = document.getElementById("origin").value.split(" ");
  route = document.getElementById("route").value;
  originRobot[2] = originRobot.slice(2, originRobot.length).join();
  limit = document.getElementById("plateau").value.split(" ");
  limit[1] = limit.slice(1, limit.length).join();
  originRobotObject = new Robot(originRobot[0], originRobot[1], limit[0], limit[1], originRobot[2], route);
  return originRobotObject;
}

},{"./coordinate.js":1,"./helper":2,"./robot.js":3}]},{},[4]);
