const numberOfColumns = 15;
const numberOfRows = 15;
const squareSize = 50;
const canvasWidth = window.innerWidth * 0.99;
const canvasHeight = window.innerHeight * 0.99;

if (Math.floor(canvasWidth / squareSize) < numberOfColumns) {
  var numberOfRenderedColumns = Math.floor(canvasWidth / squareSize);
} else {
  var numberOfRenderedColumns = numberOfColumns;
}
if (Math.floor(canvasHeight / squareSize) < numberOfRows) {
  var numberOfRenderedRows = Math.floor(canvasHeight / squareSize);
} else {
  var numberOfRenderedRows = numberOfRows;
}

var gameBoard = [];

var canvas;
var canvasContext;

var renderedBoard = [];
var topRenderedRow;
var bottomRenderedRow;
var leftRenderedCol;
var rightRenderedCol;

function Square(col, row, value) {
  this.col = col,
  this.row = row,
  this.value = value
}

function initializeCanvas() {

  $("#main").html("<canvas id=\"canvas\"><canvas>");
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");
  canvasContext.canvas.height = canvasHeight;
  canvasContext.canvas.width = canvasWidth;
}

function initializeGameBoard() {

  for (var row = 0; row < numberOfRows; row++) {
    gameBoard.push([]);
    for (var col = 0; col < numberOfColumns; col++) {
      var value = Math.random() > 0.5 ? 1 : 0;
      gameBoard[gameBoard.length - 1].push(new Square(col, row, value));
    }
  }
}

function renderSquare(col, row, square) {

  var color = square.value == 1 ? "red" : "blue";
  canvasContext.fillStyle = color;
  canvasContext.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
}

function renderBoard() {

  var renderCol = 0;
  var renderRow = 0;

  for (var row = topRenderedRow; row < bottomRenderedRow; row++) {
    for (var col = leftRenderedCol; col < rightRenderedCol; col++) {
      renderSquare(renderCol, renderRow, gameBoard[row][col]);
      renderCol++;
    }
    renderRow++;
    renderCol = 0;
  }
}

function setRenderFrame(col, row) {

  topRenderedRow = row;
  bottomRenderedRow = row;
  leftRenderedCol = col;
  rightRenderedCol = col;

  var numberOfRenderedRowsCounter = numberOfRenderedRows - 1;
  var numberOfRenderedColumnsCounter = numberOfRenderedColumns - 1;

  while (true) {
    if (numberOfRenderedRowsCounter == 0) { break; }
    if (topRenderedRow > 0) {
      topRenderedRow--;
      numberOfRenderedRowsCounter--;
    }
    if (numberOfRenderedRowsCounter == 0) { break; }
    if (bottomRenderedRow < numberOfRows) {
      bottomRenderedRow++;
      numberOfRenderedRowsCounter--;
    }
  }

  while (true) {
    if (numberOfRenderedColumnsCounter == 0) { break; }
    if (leftRenderedCol > 0) {
      leftRenderedCol--;
      numberOfRenderedColumnsCounter--;
    }
    if (numberOfRenderedColumnsCounter == 0) { break; }
    if (rightRenderedCol < numberOfColumns) {
      rightRenderedCol++;
      numberOfRenderedColumnsCounter--;
    }
  }  

  setRenderedBoard();
}

function setRenderedBoard() {

  renderedBoard = [];

  for (var row = topRenderedRow; row <= bottomRenderedRow; row++) {
    renderedBoard.push([]);
    for (var col = leftRenderedCol; col <= rightRenderedCol; col++) {
      renderedBoard[renderedBoard.length - 1].push(gameBoard[row][col]);
    }
  }
}

function initializeMouseEvenListeners() {
  window.addEventListener("mouseup", function(event) {

    var rect = canvas.getBoundingClientRect();
    var mouseCoordinates = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    var tile = {
      col: Math.floor(mouseCoordinates.x / squareSize),
      row: Math.floor(mouseCoordinates.y / squareSize)
    };

    var square = renderedBoard[tile.row][tile.col];

    console.log(square);

    setRenderFrame(square.col, square.row);
  });
}

$(document).ready(function() {
  initializeCanvas();
  initializeGameBoard();
  setRenderFrame(0, 0);
  setRenderedBoard();
  initializeMouseEvenListeners();
  window.setInterval(function() {
    renderBoard();
    // console.log(
    //   "top: " + topRenderedRow +
    //   "\nbottom: " + bottomRenderedRow +
    //   "\nleft: " + leftRenderedCol +
    //   "\nright: " + rightRenderedCol
    // );
  }, 30);
});