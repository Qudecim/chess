package game

type Game struct {

	board [8][8]Piece

	isWhiteMove bool

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

	return Game{board:board, isWhiteMove: true}

}

func (g Game) Move(color int, from_v int, from_h int, to_v int, to_h int) bool {

	// change pieces place

	return true
}