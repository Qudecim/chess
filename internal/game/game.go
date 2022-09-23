package game

type Game struct {

	board [8][8]Piece

}


func NewGame() Game {

	board := [8][8]Piece{
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
	}

	return Game{board:board}

}