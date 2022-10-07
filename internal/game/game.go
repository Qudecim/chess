package game

type Game struct {

	board [8][8]Piece

	isWhiteMove bool

}


func NewGame() Game {

	board := [8][8]Piece{
		{NewPiece(1, "rook"), NewPiece(1, "knight"), NewPiece(1, "bishop"), NewPiece(1, "queen"), NewPiece(1, "king"), NewPiece(1, "bishop"), NewPiece(1, "knight"), NewPiece(1, "rook")},
		{NewPiece(1, "pawn"), NewPiece(1, "pawn"), NewPiece(1, "pawn"), NewPiece(1, "pawn"), NewPiece(1, "pawn"), NewPiece(1, "pawn"), NewPiece(1, "pawn"), NewPiece(1, "pawn")},
		{NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty")},
		{NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty")},
		{NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty")},
		{NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty"), NewPiece(0, "empty")},
		{NewPiece(0, "pawn"), NewPiece(0, "pawn"), NewPiece(0, "pawn"), NewPiece(0, "pawn"), NewPiece(0, "pawn"), NewPiece(0, "pawn"), NewPiece(0, "pawn"), NewPiece(0, "pawn")},
		{NewPiece(0, "rook"), NewPiece(0, "knight"), NewPiece(0, "bishop"), NewPiece(0, "queen"), NewPiece(0, "king"), NewPiece(0, "bishop"), NewPiece(0, "knight"), NewPiece(0, "rook")},
	}

	return Game{board:board, isWhiteMove: true}

}

func (g *Game) Move(color int, move Move) bool {

	positions := g.board[move.From.V][move.From.H].GetSteps(g.board, move.From.V, move.From.H)

	for _, position := range positions {
		if (position.V == move.To.V && position.H == move.To.H) {
			g.board[move.To.V][move.To.H] = g.board[move.From.V][move.From.H]
			g.board[move.From.V][move.From.H] = NewPiece(0, "empty")
			return true
		}
	}

	return false
}