// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

var cols, rows;
var w = 50;
var grid = [];

var current;
var currTile;

var stack = [];

var finished;

var obj;


function setup() {


  createCanvas(600, 600);
  finished = false;
  cols = floor(width / w);
  rows = floor(height / w);
  //frameRate(5);



  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  currTile = grid[0];

  obj = new Object(0, 0);

  //frameRate(5);



}

function draw() {

  fill(150, 150, 150);
  rect(width - w + 5, height - w + 5, w-5, w-5);

    fill(0);

  text("START",5,5,45,45)
  text("END",width-45,height-45,width-5,height-5)
  if (!finished) {
    background(51);

    for (var i = 0; i < grid.length; i++) {
      grid[i].show();
    }

    current.visited = true;
    // STEP 1
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;

      // STEP 2
      stack.push(current);

      // STEP 3
      removeWalls(current, next);

      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
    current.highlight();

  }


  if (stack.length <= 0) {
    finished = true;
    obj.i = currTile.i;
    obj.j = currTile.j;

    obj.show();
  }

}


function keyPressed() {


  if (keyCode == UP_ARROW && !currTile.walls[0]) {
    currTile = grid[index(currTile.i, --(currTile.j))];
  }
  if (keyCode == DOWN_ARROW && !currTile.walls[2]) {
    currTile = grid[index(currTile.i, ++(currTile.j))];

  }
  if (keyCode == RIGHT_ARROW && !currTile.walls[1]) {
    currTile = grid[index(++(currTile.i), currTile.j)];

  }
  if (keyCode == LEFT_ARROW && !currTile.walls[3]) {
    currTile = grid[index(--(currTile.i), currTile.j)];
  }

  if(currTile == grid[index(rows-1, cols-1)]) {
    textSize(50);
    text("YOU WIN", width/2, height/2)
  }


}



function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}