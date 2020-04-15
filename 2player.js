$(document).ready(() => reset());
let xWins = 0;
let oWins = 0;
var turn;
let arr0 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function takeTurn(me) {
	if(turn == true){
		$("#"+me.id).html("X");
		arr0[me.id] = 1;
	} else {
		$("#"+me.id).html("O");
		arr0[me.id] = -1;
	}
	$("#"+me.id).attr("onclick", "");
	turn = !turn;
	setTurn();
	if(checkWin(me.id, arr0) == 1) {
		$("#turn").html("X wins!");
		endGame();
		xWins++;
	} else if(checkWin(me.id, arr0) == -1) {
		$("#turn").html("O wins!");
		endGame();
		oWins++;
	} else if (checkWin(me.id, arr0) == 0) {
		$("#turn").html("It's a draw...");
		endGame();
	} else {
		botTurn();
	}
	updateWins();
}
function endGame() {
	$("#turn").css("color", "red");
	$("#refresh").css("display", "");
	$(".square").attr("onclick", "");
}

function setTurn() {
	if (turn == true) {
		$("#turn").html("X's turn");
	} else {
		$("#turn").html("O's turn");
	}
}
function updateWins() {
	$("#xWins").html(xWins);
	$("#oWins").html(oWins);
}

function reset() {
	$(".square").html("");
	$(".square").attr("onclick", "takeTurn(this)");
	$("#turn").css("color", "black");
	$("#refresh").css("display", "none");
	turn = Math.round(Math.random());
	arr0 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	setTurn();
}

function checkWin(id, arr1) {
	//check row
	let val = 0;
	for(a = 0; a < 3; a++) {
		val += arr1[(Math.floor(id/3))*3 + a];
	}
	if(val == 3) {
		return 1;
	} else if (val == -3) {
		return -1;
	}
	//check column
	val = 0;
	for(a = 0; a < 3; a++) {
		val += arr1[id%3 + 3*a];
	}
	if(val == 3) {
		return 1;
	} else if (val == -3) {
		return -1;
	}
	//check diagonal
	val = 0;
	if(id%4 == 0) {
		for(a = 0; a < 3; a++) {
			val += arr1[a*4];
		}
		if(val == 3) {
			return 1;
		}
		else if (val == -3) {
			return -1;
		}
	}
	//check reverse diagonal
	val = 0;
	if(id == 2 || id == 4 || id == 6) {
		for(a = 0; a < 3; a++) {
			val += arr1[2+(2*a)];
		}
		if(val == 3) {
			return 1;
		}
		else if (val == -3) {
			return -1;
		}
	}
	//check draw
	for(a = 0; a < 9; a++) {
		if(arr1[a] == 0) {
			return null;
		}
	} return 0;
}
