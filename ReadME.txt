---------- MARS ROVER PROBLEM ----------

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers so that their
on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position and location is represented by a combination of x and y co-ordinates and
a letter representing one of the four cardinal compass points. The plateau is divided up into
a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is
in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are
‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively,
without moving from its current spot. ‘M’ means move forward one grid point, and maintain the
same heading.

Assume that the square directly North from (x, y) is (x, y+1).

Input:

The first line of input is the upper-right coordinates of the plateau, the lowerleft
coordinates are assumed to be 0,0.
The rest of the input is information pertaining to the rovers that have been deployed.
Each rover has two lines of input. The first line gives the rover’s position, and the
second line is a series of instructions telling the rover how to explore the plateau.
The position is made up of two integers and a letter separated by spaces, corresponding
to the x and y co-ordinates and the rover’s orientation.
Each rover will be finished sequentially, which means that the second rover won’t start
to move until the first one has finished moving.

Output:

The output for each rover should be its final co-ordinates and heading


---------- CONSTRAINTS ----------

First of all, let's describe some constraints:

  - The rover cannot leave the plateau at any moment. This includes the initial position,
  the displacement and the destination position.

  - They cannot pile up, which means a rover cannot occupy another rover's position
  at any moment.


---------- USAGE ----------

---- Website ----
Open file: index.html

Let's describe the website. Three text inputs can be found at index.html:

  - Plateau extension: this is the plateau size. Two integers must be entered separated
  by a space. Example: "5 5".

  - Initial Point: this textbox is used for the initial position and orientation of the rovers.
  Two integers followed by the rover's orientation must be entered, all of them separated by a space.
  The only valid inputs for the orientation are "N", "S", "E" and "W". Example: "0 0 N".

  - Routes: commands to control the rover's movement are set in this textbox. It takes "M" (forward movement),
  "R" (spin 90 degrees to the right) and "L" (spin 90 degrees to the left) as input. You can concatenate commands
  just typing them together. Example: "MMRML".

  - Movement: Button to calculate the final position and orientation of the rover.

  - Textbox below "Movement": it will display the final position and orientation of the rover. The button "+" can be
  used to add the final position to a list with the other rovers' final position.

Clicking the "+" button for the first time will lock the plateau size if there are no errors.
When clicking the "Movement" button, if "Initial position" is not valid, the textbox will turn red. If "Routes" is not valid,
it will turn red the same way. If there is a robot already in that position, the textbox with the final position and orientation
will turn red.

---- Test environment ----
The test framework used is Mocha, along with the assertion library Chai.
Node is required: 
npm install

To run the test: 
npm test


---- Modifications in javascript files ----

To run the Mocha test without any structural change in the project, Browserify has been used.
Browserify provide the posibility to use require (require is needed for the test)
Browserify blundles up the javascript files in a unique javascript, "bundle.js".

To install browserify: 
npm install -g browserify

If any js file is modified, it is necessary to run the following command in the terminal from the folder "script":
browserify util.js > bundle.js


---------- CONTACT ----------

sarneijim@hotmail.com
