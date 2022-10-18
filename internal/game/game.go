package game

import ("math")

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

	positions := g.board[move.From.V][move.From.H].GetSteps(&g.board, move.From.V, move.From.H)

	for _, position := range positions {
		if (position.V == move.To.V && position.H == move.To.H) {
			g.board[move.To.V][move.To.H] = g.board[move.From.V][move.From.H]
			g.board[move.From.V][move.From.H] = NewPiece(0, "empty")
			g.board[move.To.V][move.To.H].moved = true

			// Exception for castling
			if (g.board[move.To.V][move.To.H].item.Name == "king") {
				if (math.Abs(move.To.H - move.From.H) > 1) {
					if (move.To.H > move.From.H) {
						g.board[move.To.V][7].moved = true
						g.board[move.To.V][move.To.H - 1] = g.board[move.From.V][7]
						g.board[move.From.V][7] = NewPiece(0, "empty")
					} else {
						g.board[move.To.V][0].moved = true
						g.board[move.To.V][move.To.H + 1] = g.board[move.From.V][0]
						g.board[move.From.V][0] = NewPiece(0, "empty")
					}
				}
			}
			
			return true
		}
	}

	return false
}

func (g *Game) IsCheck(color int) bool {
	return g.isCheck(&g.board, color)
}

func (g *Game) isCheck(board *[8][8]Piece, color int) bool {

	// Получить позицию короля
	kingPosition := g.getKingPosition(board, color)

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
func (g *Game) getCheckPiece(board *[8][8]Piece,color int) Position {

	// Получить позицию короля
	kingPosition := g.getKingPosition(board,color)

	// Проверяем угражает ли чужая фигура королю
    // Перебираем все элементы борда
	for v, line := range g.board {
		for h, piece := range line {
			if (!piece.isEmpty) {
				if (piece.color != color) {
					positions := piece.GetSteps(board, v, h)
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

func (g *Game) getKingPosition(board *[8][8]Piece, color int) Position {
	var kingPosition Position
	for v, line := range board {
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
func (g *Game) IsMate(color int) bool {

	 //copy(g.board, "[8][8]Piece")
	 board := g.board

	for v, line := range g.board {
		for h, piece := range line {
			if (!piece.isEmpty) {
				if (piece.color == color) {
					positions := piece.GetSteps(&g.board, v, h)
					for _,position := range positions {
						
						tmp := board[position.V][position.H]
						board[position.V][position.H] = board[v][h]
						board[v][h] = NewPiece(0, "empty")

						if (g.isCheck(&board, color)) {
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