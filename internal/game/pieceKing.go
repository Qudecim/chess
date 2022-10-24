package game

type PieceKing struct {

	Name string
	
}

func (p PieceKing) GetSteps(board *[8][8]Piece, color int, v int, h int, lastMove *Move) []Position {

	var positions []Position

	pieceMoves := []PieceMove{pm(1,0),pm(-1,0),pm(0,1),pm(0,-1),pm(1,1),pm(-1,-1),pm(1,-1),pm(-1,1)}

	positions = getSteps(board, color, v, h, pieceMoves, true, p.Name)
	
	return positions

}

func (p PieceKing) GetName() string {
	return p.Name
}