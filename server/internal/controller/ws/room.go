package v1

import (
	"fmt"
	"github.com/qudecim/chess/internal/game"
)

type Room struct {

	name []byte

	white *Client

	black *Client

	game Game

}


func newRoom(name []byte, c *Client) *Room {

	d:=NewGame()

	fmt.Println(d)

	return &Room {
		name:name,
		white:c,
		game: NewGame(),

	}
}