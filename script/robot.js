const Coordinates = require('./coordinate.js');
const helper = require('./helper');

const robotAddedList = [];

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

