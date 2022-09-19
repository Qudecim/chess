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
	
	room_name []byte

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
	fmt.Println(fmt.Sprintf("%#v", action))
	switch string(action.Action) {
		case "create_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println("create_room")
			//room := &Room{name:actionRoom.room_name}
			//room.white = c

			room := newRoom(actionRoom.room_name, c)

			c.hub.rooms[string(actionRoom.room_name)] = room
		case "join_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println("join_room")
			c.hub.rooms[string(actionRoom.room_name)].black = c
			fmt.Println(fmt.Sprintf("%#v", c.hub.rooms[string(actionRoom.room_name)]))
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
		default:
			fmt.Println("default")
	}
}