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
	fmt.Println(fmt.Sprintf("%#v", action))
	switch string(action.Action) {
		case "create_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println(actionRoom)
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
			fmt.Println("join_room")
			c.hub.rooms[actionRoom.Room_name].black = c
			fmt.Println(fmt.Sprintf("%#v", c.hub.rooms[actionRoom.Room_name]))
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
			c.room.white.send <- []byte("MMove")
			c.room.black.send <- []byte("MMove")
		default:
			fmt.Println("default")
	}
}