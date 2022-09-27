package v1

import (
	"encoding/json"
	"log"
	"fmt"
)

type Action struct {

	Action string `json:"action"`

}

type ActionRoom struct {
	
	Room_name string `json:"room_name"`

}

type Moves struct {

	v int
	h int
}

type ActionMove struct {

	from Moves
	to Moves

}



func run(message []byte, c *Client) {
	var action Action

	err := json.Unmarshal(message, &action)
    if err != nil {
        log.Fatal(err)
    }

	switch string(action.Action) {
		case "create_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
			//room := &Room{name:actionRoom.room_name}
			//room.white = c
			room := newRoom([]byte(actionRoom.Room_name), c)
			c.hub.rooms[actionRoom.Room_name] = room
			c.room = room
		case "join_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
			c.hub.rooms[actionRoom.Room_name].black = c
			c.room = c.hub.rooms[actionRoom.Room_name]
			c.room.Start()
		case "leave_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
		case "move":
			var actionMove ActionMove

			err := json.Unmarshal(message, &actionMove)
			if err != nil {
				log.Fatal(err)
			}

			color := 0
			if (c.room.black == c) {
				color = 1
			}

			fmt.Println("move:")
			fmt.Println(c.room.canMove)
			fmt.Println(color)
			if (c.room.canMove != color) {
				return
			}

			if (color == 0) {
				c.room.canMove = 1
			} else {
				c.room.canMove = 0
			}

			move := c.room.game.Move(color, actionMove.from.v, actionMove.from.h, actionMove.to.v, actionMove.to.h,)

			if (move) {
				if (color == 0) {
					c.room.black.send <- message
				} else {
					c.room.white.send <- message
				}
			}
			

		default:
			fmt.Println("default")
	}
}