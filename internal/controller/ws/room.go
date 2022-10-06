package v1

import (
	"encoding/json"
	"github.com/qudecim/chess/internal/game"
)

type Room struct {

	name []byte

	white *Client

	black *Client

	game *game.Game

	canMove int

}


func newRoom(name []byte, c *Client) *Room {

	g := game.NewGame()

	return &Room {
		name:name,
		white:c,
		game: &g,
		canMove: 0,
	}
}

func (r *Room) Start() {

	data_white := StartGame{Action:"start", Color:0}
	json_white, _ := json.Marshal(data_white)
	r.white.send <- json_white

	data_black := StartGame{Action:"start", Color:1}
	json_black, _ := json.Marshal(data_black)
	r.black.send <- json_black

}

type StartGame struct {

	Action string `json:"action"`

	Color int `json:"color"`

}