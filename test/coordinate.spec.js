let chai = require('chai'),
  path = require('path');

chai.should();

let Coordinates = require(path.join(__dirname, '..', 'script/coordinate'));

describe('Coordinates', () => {
  describe('Check coordinates', () => {
    let coordinates;
    it('returns the the check of coordinates', () => {
      coordinates = new Coordinates(0, 3, 0, 3);
      coordinates.checkCoordinates.should.equal(true);
    });
    it('do not accept negative values', () => {
      coordinates = new Coordinates(-3, 2, -3, 2);
      coordinates.checkCoordinates.should.equal(false);
    });
    it('do not accept string values', () => {
      coordinates = new Coordinates('hi', 'hello', 'hi', 'hello');
      coordinates.checkCoordinates.should.equal(false);
    });
    it('do not accept float values', () => {
      coordinates = new Coordinates(3, 3.5, 3, 3.5);
      coordinates.checkCoordinates.should.equal(false);
    });
    it('limit must be bigger than coordinates', () => {
      coordinates = new Coordinates(3, 2, 7, 8);
      coordinates.checkCoordinates.should.equal(true);
    });
    it('limit must be bigger than coordinates', () => {
      coordinates = new Coordinates(8, 2, 7, 8);
      coordinates.checkCoordinates.should.equal(false);
    });
  });
});
