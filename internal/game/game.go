package game

import (
	"github.com/qudecim/chess/internal/data"
	"fmt"
)

type Game struct {

	board [8][8]Piece

	isWhiteMove bool

}


func NewGame() Game {

	board := [8][8]Piece{
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
		{newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(0, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight"), newPiece(1, "knight")},
	}

	return Game{board:board, isWhiteMove: true}

}

func (g Game) Move(color int, move data.Move) bool {

	positions := g.board[move.From.V][move.From.H].GetSteps()

	fmt.Println(positions)
	fmt.Println(move)

	for _, position := range positions {
		if (position.V == move.To.V && position.H == move.To.H) {
			return true
		}
	}

	return false
}