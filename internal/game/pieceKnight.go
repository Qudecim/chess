package game

import (
	"fmt"
)

type PieceKnight struct {

	Name string
	
}

func (p PieceKnight) GetSteps(board *[8][8]Piece, color int, v int, h int, lastMove *Move) []Position {

	var positions []Position

	pieceMoves := []PieceMove{pm(-2,-1),pm(-2,1),pm(-1,2),pm(1,2),pm(2,1),pm(2,-1),pm(1,-2),pm(-1,-2)}

	positions = getSteps(board, color, v, h, pieceMoves, true, p.Name)

	fmt.Println(positions)
	
	return positions

}

func (p PieceKnight) GetName() string {
	return p.Name
}