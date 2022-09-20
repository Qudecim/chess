package game

type Piece struct {
	color int
	name string
}

func newPiece(color int, name string) Piece {
	return Piece{color:color, name:name}
}