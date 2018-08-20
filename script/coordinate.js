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
