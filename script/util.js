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

function checkLimit(){
  limit = document.getElementById("plateau").value.split(" ");
  limit[1] = limit.slice(1, limit.length).join();
  limitObject = new Coordinates(limit[0], limit[1], limit[0], limit[1]);
  return limitObject.checkCoordinates;
}

function initRobot(){
  originRobot = document.getElementById("origin").value.split(" ");
  route = document.getElementById("route").value;
  originRobot[2] = originRobot.slice(2, originRobot.length).join();
  limit = document.getElementById("plateau").value.split(" ");
  limit[1] = limit.slice(1, limit.length).join();
  originRobotObject = new Robot(originRobot[0], originRobot[1], limit[0], limit[1], originRobot[2], route);
  return originRobotObject;
}

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
