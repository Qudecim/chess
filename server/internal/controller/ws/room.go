package v1

type Room struct {

	name []byte

	white *Client

	black *Client

	board [8][8]Cell

	next_move int

}

type Cell struct {

	name string

}

func newRoom(name []byte, c *Client) *Room {

	emptyCell := Cell{name:"empty"}

	 board := [8][8]Cell{
		{emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell},
		{emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell},
		{emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell},
		{emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell},
		{emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell},
		{emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell},
		{emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell,emptyCell},
	 }

	return &Room {
		name:name,
		white:c,
		board:board,
		next_move:0,
	}
}