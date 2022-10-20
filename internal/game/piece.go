package game

type PieceItem interface {
	GetSteps(board *[8][8]Piece, color int, v int, h int) []Position
	GetName() string
}

type Piece struct {
	color int
	name string
	item PieceItem
	isEmpty bool
	moved bool
}

func (p Piece) GetSteps(board *[8][8]Piece, v int, h int) []Position {
	return p.item.GetSteps(board, p.color, v, h)
}

func (p Piece) getName() string {
	return p.item.GetName()
}

func (p Piece) Go(board *[8][8]Piece, fromV int, fromH int, toV int, toH int) {
	board[fromV][fromH].moved = true
	board[toV][toH] = board[fromV][fromH]
	board[fromV][fromH] = NewPiece(0, "empty")
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
		piece = PieceKnight{Name:name}
	case "rook":
		piece = PieceRook{Name:name}	
	default:
		isEmpty = true
		piece = PieceEmpty{Name:name}	
	}

	return Piece{color:color, name:name, item:piece, isEmpty:isEmpty, moved:false}
}

