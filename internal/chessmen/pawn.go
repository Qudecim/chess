package chessmen

import (
	"github.com/qudecim/chess/internal/data"
)

type Pawn struct {

	Name string
	
}

func (p Pawn) GetSteps() []data.Position {

	var positions []data.Position

	position := data.Position{V:5, H:0}

	positions = append(positions, position)

	return positions

}