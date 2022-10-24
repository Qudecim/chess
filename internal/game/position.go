package game

type Position struct {

	V int `json:"v"`
	H int `json:"h"`

	PawnPass bool
}

func newPosition(v int, h int) Position {
	position := Position{}
	position.V = v
	position.H = h
	position.PawnPass = false
	return position
}

func newPositionPawnPass(v int, h int) Position {
	position := Position{}
	position.V = v
	position.H = h
	position.PawnPass = true
	return position
}