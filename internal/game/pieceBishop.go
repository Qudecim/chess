package game

type PieceBishop struct {

	Name string
	
}

func (p PieceBishop) GetSteps(board *[8][8]Piece, color int, v int, h int) []Position {

	var positions []Position

	pieceMoves := []PieceMove{pm(1,1),pm(-1,-1),pm(1,-1),pm(-1,1)}

	positions = getSteps(board, color, v, h, pieceMoves, false)
	
	return positions

}