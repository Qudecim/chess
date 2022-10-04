package game

import (
	"github.com/qudecim/chess/internal/chessmen"
	"github.com/qudecim/chess/internal/data"
)

type PieceItem interface {
	GetSteps() []data.Position
}

// TODO: фигура должна хранить позицию себя, для того что бы получить 
type Piece struct {
	color int
	name string
	item PieceItem
}

func (p Piece) GetSteps() []data.Position {
	return p.item.GetSteps()
}

func newPiece(color int, name string) Piece {

	pieceEmpty := chessmen.Pawn{Name:name}

	return Piece{color:color, name:name, item:pieceEmpty}
}