package game

type PiecePawn struct {

	Name string
	
}

func (p PiecePawn) GetSteps(board *[8][8]Piece, color int, v int, h int, lastMove *Move) []Position {
	var positions []Position

	stepLine := v

	// Пешка ходин на одину клетку вперед
	if (color == 0) {
		stepLine--
	} else {
		stepLine++
	}

	// В начале можно пойти на две
	if (color == 0) {
		if (v == 6) {
			if (board[4][h].isEmpty) {
				positions = append(positions, newPosition(4, h))
			}
		}

	} else {
		if (v == 1) {
			if (board[3][h].isEmpty) {
				positions = append(positions, newPosition(3, h))
			}
		}
	}

	// Ход на одну если не мешает никто
	if (board[stepLine][h].isEmpty) {
		positions = append(positions, newPosition(stepLine, h))
	}

	// Рубим в лево
	if (h - 1 >= 0) {
		if (!board[stepLine][h - 1].isEmpty) {
			positions = append(positions, newPosition(stepLine, h - 1))
		}
	}

	// Рубим в право
	if (h + 1 <= 7) {
		if (!board[stepLine][h + 1].isEmpty) {
			positions = append(positions, newPosition(stepLine, h + 1))
		}
	}

	// Срубить в проход
	if (board[lastMove.To.V][lastMove.To.H].getName() == "pawn") {
		if (lastMove.To.V == 3 && lastMove.From.V == 1) {
			if (v == 3) {
				if (h - 1 == lastMove.To.H) {
					positions = append(positions, newPositionPawnPass(2, h - 1))
				}
				if (h + 1 == lastMove.To.H) {
					positions = append(positions, newPositionPawnPass(2, h + 1))
				}
			}
		}

		if (lastMove.To.V == 4 && lastMove.From.V == 6) {
			if (v == 4) {
				if (h - 1 == lastMove.To.H) {
					positions = append(positions, newPositionPawnPass(5, h - 1))
				}
				if (h + 1 == lastMove.To.H) {
					positions = append(positions, newPositionPawnPass(5, h + 1))
				}
			}
		}
	}

	return positions

}

func (p PiecePawn) GetName() string {
	return p.Name
}