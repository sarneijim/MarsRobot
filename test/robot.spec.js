
let chai = require('chai'),
  path = require('path');
var expect = chai.expect;
chai.should();

let Robot = require(path.join(__dirname, '..', 'script/robot'));

describe('Robot', () => {
  describe('Check Direction', () => {
    let robot;
    it('Direction can be N - E - W - S', () => {
      robot = new Robot(3, 2, 5, 6, "N", "mln");
      robot.checkDirection.should.equal(true);
    });
    it('Direction must be in capital letters', () => {
      robot = new Robot(3, 2, 5, 6, "n", "mln");
      robot.checkDirection.should.equal(false);
    });

    it('Direction can not be a number', () => {
      robot = new Robot(3, 2, 5, 6, 3, "mln");
      robot.checkDirection.should.equal(false);
    });
    it('Direction can not be a word string', () => {
      robot = new Robot(3, 2, 5, 6, "left", "mln");
      robot.checkDirection.should.equal(false);
    });
  });
  describe('Check Occupied', () => {
    let robot = new Robot(3, 2, 5, 6, "N", "mln");
    robot.add
    it('Robot is in the same position than previous saved', () => {
      let robot = new Robot(3, 2, 1, 1, "No", "MRM");
      robot.checkOccupied.should.equal(false);
    });
    it('There are space', () => {
      robot = new Robot(0, 2, 5, 6, "N", "mln");
      robot.checkOccupied.should.equal(true);
    });
  });
  describe('Check Route', () => {
    let robot;
    it('Route can be L - R - M', () => {
      robot = new Robot(3, 2, 5, 6, "N", "LM");
      robot.checkRoute.should.equal(true);
    });
    it('Route must be in capital letters', () => {
      robot = new Robot(3, 2, 5, 6, "n", "l");
      robot.checkRoute.should.equal(false);
    });
    it('Route can not be a number', () => {
      robot = new Robot(3, 2, 5, 6, 3, "");
      robot.checkRoute.should.equal(true);
    });
    it('Route can not be a number', () => {
      robot = new Robot(3, 2, 5, 6, 3, '3');
      robot.checkRoute.should.equal(false);
    });
  });
  describe('Check Movement', () => {
    let robot;
    it('Modify aux direction width L or R routes', () => {
      robot = new Robot(3, 2, 5, 6, "N", "RRRRRMRLR");
      robot.checkMovement;
      expect(robot.auxDirection).to.equal(2);
    });
    it('Do not modify aux direction with M routes', () => {
      robot = new Robot(3, 2, 10, 10, "E", "MM");
      robot.checkMovement;
      expect(robot.auxDirection).to.equal(0);
    });
    it('Check position when M', () => {
      robot = new Robot(3, 2, 10, 10, "E", "MM");
      robot.checkMovement.should.equal(true);
    });
    it('Check position all movements', () => {
      robot = new Robot(0, 0, 10, 10, "E", "MMLMMMLLMMM");
      robot.checkMovement.should.equal(false);
    });
  });
  describe('Update Direction', () => {
    let robot;
    beforeEach(function () {
      robot = new Robot();
    });
    it('Update direction with auxDirection', () => {
      robot.auxDirection = 2;
      robot.updateDirection;
      expect(robot.direction).to.equal('S');
    });
    it('Update direction use aux direcction. It is a integer, must be between 1 - 4<', () => {
      robot.auxDirection = 'sas';
      robot.updateDirection;
      expect(robot.direction).to.equal(undefined);
    });
  });

});
