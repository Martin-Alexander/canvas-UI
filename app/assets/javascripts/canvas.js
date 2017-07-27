// Board data
var numberOfColumns = 100;
var numberOfRows = 80;
var boardData = [];

// Rendering data
var squareSize = 50;
var canvasWidth = window.innerWidth * 0.95;
var canvasHeight = window.innerHeight * 0.95;
var centerSquare = { row: 0, col: 0 };
var renderedBoard = [];
var numberOfRenderedColumns;
var numberOfRenderedRows;

var canvas;
var canvasContext;

function setNumberOfRenderedColumns() {

  numberOfRenderedColumns = Math.floor(canvasWidth / squareSize);
}

function setNumberOfRenderedRow() {

  numberOfRenderedRows = Math.floor(canvasHeight / squareSize);
}

function partOfBoardThatIsRendered() {

  renderedBoard = [];

  var leftmostRenderedColumn = centerSquare.col - (numberOfRenderedColumns / 2);
  var rightmostRenderedColumn = centerSquare.col + (numberOfRenderedColumns / 2);
  var topmostRenderedRow = centerSquare.row - (numberOfRenderedRows / 2);
  var bottommostRenderedRow = centerSquare.row + (numberOfRenderedRows / 2);
  
  if (leftmostRenderedColumn < 0) {
    leftmostRenderedColumn = 0;
    rightmostRenderedColumn = numberOfRenderedColumns;
  }

  if (rightmostRenderedColumn > numberOfColumns) {
    rightmostRenderedColumn = numberOfColumns;
    leftmostRenderedColumn = numberOfColumns - numberOfRenderedColumns;
  }

  if (topmostRenderedRow < 0) {
    topmostRenderedRow = 0;
    bottommostRenderedRow = numberOfRenderedRows;
  }

  if (bottommostRenderedRow > numberOfRows) {
    bottommostRenderedRow = numberOfRows;
    topmostRenderedRow = numberOfRows - numberOfRenderedRows;
  }

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

function renderBoard() {
  // This needs to be refined
  var num_rows = renderedBoard.length;
  var num_cols = renderedBoard[0].length;
  for (var row = 0; row < num_rows; row++) {
    for (var col = 0; col < num_cols; col++) {
      var square = renderedBoard[row][col];
      if (square == 1) {
        canvasContext.fillStyle = "red";
        canvasContext.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        canvasContext.fill();
      } else {
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        canvasContext.fill();        
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
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");
  canvasContext.canvas.width = canvasWidth;
  canvasContext.canvas.height = canvasHeight;

  setNumberOfRenderedColumns();
  setNumberOfRenderedRow();

  window.addEventListener("mouseup", function(event) {
    var rect = canvas.getBoundingClientRect();
    mouseCoordinates = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    
  });

  window.setInterval(function() {
    partOfBoardThatIsRendered();
    renderBoard();
  }, 30);
});