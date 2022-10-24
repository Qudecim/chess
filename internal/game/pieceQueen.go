package game

type PieceQueen struct {

	Name string
	
}

func (p PieceQueen) GetSteps(board *[8][8]Piece, color int, v int, h int, lastMove *Move) []Position {

	var positions []Position

	pieceMoves := []PieceMove{pm(1,0),pm(-1,0),pm(0,1),pm(0,-1),pm(1,1),pm(-1,-1),pm(1,-1),pm(-1,1)}

	positions = getSteps(board, color, v, h, pieceMoves, false, p.Name)
	
	return positions

}

func (p PieceQueen) GetName() string {
	return p.Name
}