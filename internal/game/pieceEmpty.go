package game

type PieceEmpty struct {

	Name string
	
}

func (p PieceEmpty) GetSteps(board *[8][8]Piece, color int, v int, h int, lastMove *Move) []Position {

	var positions []Position

	return positions

}

func (p PieceEmpty) GetName() string {
	return p.Name
}