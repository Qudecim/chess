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

	isStart bool

}


func newRoom(name []byte, c *Client) *Room {

	g := game.NewGame()

	return &Room {
		name:name,
		white:c,
		game: &g,
		canMove: 0,
		isStart: false,
	}
}

func (r *Room) Start() {

	startGameWhite := StartGame{Color: 0}
	data_white := Response{Action:"start", StartGame:startGameWhite}
	json_white, _ := json.Marshal(data_white)
	r.white.send <- json_white

	startGameBlack := StartGame{Color: 1}
	data_black := Response{Action:"start", StartGame:startGameBlack}
	json_black, _ := json.Marshal(data_black)
	r.black.send <- json_black

	r.isStart = true

}

func (r *Room) End() {

    delete(r.white.hub.rooms, string(r.name));

}

type StartGame struct {

	Color int `json:"color"`

}