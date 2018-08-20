module.exports = {
  modulus: function (elem) {
    return ((elem % 4) + 4) % 4;
  },
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

