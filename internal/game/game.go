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

func (g *Game) isCheck(board [8][8]Piece,color int) bool {

	// Получить позицию короля
	kingPosition := g.getKingPosition(color)

	// Проверяем угражает ли чужая фигура королю
    // Перебираем все элементы борда
	for v, line := range board {
		for h, piece := range line {
			if (!piece.isEmpty) {
				if (piece.color != color) {
					positions := piece.GetSteps(board, v, h)

					for _,position := range positions {
						if (position.H == kingPosition.H && position.V == kingPosition.V) {
							return true
						}
					}

				}
			}
		}
	}

	return false
}

// Получить позицию фигуры котоорая угражает нам
func (g *Game) getCheckPiece(color int) Position {

	// Получить позицию короля
	kingPosition := g.getKingPosition(color)

	// Проверяем угражает ли чужая фигура королю
    // Перебираем все элементы борда
	for v, line := range g.board {
		for h, piece := range line {
			if (!piece.isEmpty) {
				if (piece.color != color) {
					positions := piece.GetSteps(g.board, v, h)
					for _,position := range positions {
						if (position.H == kingPosition.H && position.V == kingPosition.V) {
							return position
						}
					}
				}
			}
		}
	}

	return Position{H:0,V:0}
}

func (g *Game) getKingPosition(color) Position {
	var kingPosition Position
	for v, line := range g.board {
		for h, piece := range line {
			if (piece.name == "king") {
				if (piece.color == color) {
					kingPosition = Position{H:h, V:v}
				}
			}
		}
	}
	return kingPosition
}


// Перебираем все наши фигуры, получаем все ходы каждой фигуры, и делаем ход
// Если после хода это не шах, значит это не мат
// Если все равно шах, то откатываем его и пробуем дальше
// Можно оптимизирвать
// И сначала проверять дает ли шах та фигура которая до этого давала, и только после этого проверять всю доску шах
func (g *Game) isMate() bool {

	board := copy(g.board)

	for v, line := range g.board {
		for h, piece := range line {
			if (!piece.isEmpty) {
				if (piece.color == color) {
					positions := piece.GetSteps(g.board, v, h)
					for _,position := range positions {
						
						tmp := board[position.V][position.H]
						board[position.V][position.H] = board[v][h]
						board[v][h] = NewPiece(0, "empty")

						if (g.isCheck(board, color)) {
							board[v][h] = board[position.V][position.H]
							board[position.V][position.H] = tmp
						} else {
							return false
						}
					}
				}
			}
		}
	}

	return true
}