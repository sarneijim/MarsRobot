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

