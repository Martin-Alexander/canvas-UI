// Board data
var numberOfColumns = 100;
var numberOfRows = 80;
var boardData = [];

// Rendering data
var squareSize = 50;
var canvasWidth = window.innerWidth * 0.95;
var canvasHeight = window.innerHeight * 0.95;
var numberOfColumns;
var numberOfRows;
var centerSquare = { row: 50, col: 40 };
var renderedBoard = [];
var numberOfRenderedColumns;
var numberOfRenderedRows;

function setNumberOfRenderedColumns() {

  numberOfRenderedColumns = Math.floor(canvasWidth / squareSize);
}

function setNumberOfRenderedRow() {

  numberOfRenderedRows = Math.floor(canvasHeight / squareSize);
}

function partOfBoardThatIsRendered() {

  var leftmostRenderedColumn = centerSquare.col - numberOfRenderedColumns / 2;
  var rightmostRenderedColumn = centerSquare.col + numberOfRenderedColumns / 2;
  var topmostRenderedRow = centerSquare.row - numberOfRenderedRows / 2;
  var bottommostRenderedRow = centerSquare.row + numberOfRenderedRows / 2;

  for (var row = 0; row < numberOfRows; row++) {
    if (row < bottommostRenderedRow && row > topmostRenderedRow) {
      renderedBoard.push([]);
      for (var col = 0; col < numberOfColumns; col++) {
        if (col > leftmostRenderedColumn && col < rightmostRenderedColumn) {
          renderedBoard[renderedBoard.length - 1].push(boardData[row][col]);
        }
      }
    }
  }
}

for (var row = 0; row < numberOfRows; row++) {
  boardData.push([]);
  for (var col = 0; col < numberOfColumns; col++) {
    boardData[boardData.length - 1].push(Math.random() > 0.5 ? 1 : 0);
  }
}

$(document).ready(function() {
  
  $("#main").html("<canvas id=\"canvas\"><canvas>");
  var canvas = document.getElementById("canvas");
  var canvasContext = canvas.getContext("2d");
  canvasContext.canvas.width = canvasWidth;
  canvasContext.canvas.height = canvasHeight;

  setNumberOfRenderedColumns();
  setNumberOfRenderedRow();
  partOfBoardThatIsRendered();

  console.log(renderedBoard);

  window.setInterval(function() {

  }, 30);
});