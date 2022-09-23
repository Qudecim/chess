package v1

import (
	"github.com/qudecim/chess/internal/game"
)

type Room struct {

	name []byte

	white *Client

	black *Client

	game game.Game

}


func newRoom(name []byte, c *Client) *Room {

	return &Room {
		name:name,
		white:c,
		game: game.NewGame(),

	}
}