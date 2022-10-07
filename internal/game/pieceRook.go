package game


type PieceRook struct {

	Name string
	
}

func (p PieceRook) GetSteps(board [8][8]Piece, color int, v int, h int) []Position {

	var positions []Position

	pieceMoves := []PieceMove{pm(1,0),pm(-1,0),pm(0,1),pm(0,-1)}

	positions = getSteps(board, color, v, h, pieceMoves, false)
	
	return positions

}