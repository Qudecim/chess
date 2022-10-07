package game


type PiecePawn struct {

	Name string
	
}

func (p PiecePawn) GetSteps(board [8][8]Piece, color int, v int, h int) []Position {
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
				positions = append(positions, Position{V:4, H:h})
			}
		}

	} else {
		if (v == 1) {
			if (board[3][h].isEmpty) {
				positions = append(positions, Position{V:3, H:h})
			}
		}
	}

	// Ход на одну если не мешает никто
	if (board[stepLine][h].isEmpty) {
		positions = append(positions, Position{V:stepLine, H:h})
	}

	// Рубим в лево
	if (h - 1 >= 0) {
		if (!board[stepLine][h - 1].isEmpty) {
			positions = append(positions, Position{V:stepLine, H:h - 1})
		}
	}

	// Рубим в право
	if (h + 1 <= 7) {
		if (!board[stepLine][h + 1].isEmpty) {
			positions = append(positions, Position{V:stepLine, H:h + 1})
		}
	}

	return positions

}