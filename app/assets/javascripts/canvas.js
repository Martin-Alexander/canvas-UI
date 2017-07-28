const numberOfColumns = 100;
const numberOfRows = 80;
const squareSize = 50;
const canvasWidth = window.innerWidth * 0.95;
const canvasHeight = window.innerHeight * 0.95;
const numberOfRenderedColumns;
const numberOfRenderedRows;

var gameBoard = [];

var canvas;
var canvasContext;

var centerSquare = { row: 0, col: 0 };
var renderedBoard = [];
var topRenderedRow;
var bottomRenderedRow;
var leftRenderedCol;
var rightRenderedCol;

function Square(col, row, value) = {
  this.col: col,
  this.row: row,
  this.value: value
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