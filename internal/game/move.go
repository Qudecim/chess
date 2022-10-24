package game

type Move struct {

	From Position `json:"from"`
	To Position `json:"to"`
	SelectPiece string `json:"selectPiece"`
}

type PieceMove struct {

	h int
	v int
	end bool

}

func pm(v int, h int) PieceMove {
	return PieceMove{v:v, h:h, end:false}
}

func getSteps(board *[8][8]Piece, color int, v int, h int, pms []PieceMove, once bool, pieceName string) []Position {
	var positions []Position

	steps := 8
	if (once) {
		steps = 2
	}

	for i := 1; i < steps; i++ {

		for index, pm := range pms {

			if (!pm.end) {

				nv := v + (i * pm.v)
				nh := h + (i * pm.h)

				if (nv < 0 || nv > 7) {
					continue
				}
				if (nh < 0 || nh > 7) {
					continue
				}

				if (board[nv][nh].isEmpty) {
					positions = append(positions, Position{V:nv, H:nh})
				} else {

					if (board[nv][nh].color != color) {
						positions = append(positions, Position{V:nv, H:nh})
					}

					pms[index].end = true

				}

			}

		}

	}

	// TODO: здесь мы должны еще проверить не находится ли король под шахом
	// Но пока это лень делать
	if (pieceName == "king") {
		if (!board[v][h].moved) {

			if (!board[v][0].moved) {
				havePiece := false
				for i := h - 1; i > 0; i-- {
					if (!board[v][i].isEmpty) {
						havePiece = true
					}
				}
				if (!havePiece) {
					positions = append(positions, Position{V:v, H:h - 2})
				}
			}

			if (!board[v][7].moved) {
				havePiece := false
				for i := h + 1; i > 7; i++ {
					if (!board[v][i].isEmpty) {
						havePiece = true
					}
				}
				if (!havePiece) {
					positions = append(positions, Position{V:v, H:h + 2})
				}
			}
		}
	}


	return positions
}