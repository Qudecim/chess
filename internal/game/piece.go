package game

type PieceItem interface {
	GetSteps(board [8][8]Piece, color int, v int, h int) []Position
}

// TODO: фигура должна хранить позицию себя, для того что бы получить 
type Piece struct {
	color int
	name string
	item PieceItem
	isEmpty bool
}

func (p Piece) GetSteps(board [8][8]Piece, v int, h int) []Position {
	return p.item.GetSteps(board, p.color, v, h)
}

func NewPiece(color int, name string) Piece {

	var piece PieceItem

	isEmpty := false

	switch name {
	case "pawn":
		piece = PiecePawn{Name:name}
	case "king":
		piece = PieceKing{Name:name}
	case "queen":
		piece = PieceQueen{Name:name}
	case "bishop":
		piece = PieceBishop{Name:name}	
	case "knight":
		piece = PieceKing{Name:name}
	case "Rook":
		piece = PieceKing{Name:name}	
	default:
		isEmpty = true
		piece = PieceEmpty{Name:name}	
	}

	return Piece{color:color, name:name, item:piece, isEmpty:isEmpty}
}

