package v1

import (
	"encoding/json"
	"log"
	"fmt"
)

type Action struct {

	Action string `json:"action"`

	Test int `json:"test"`

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

type testStruct struct {
    Clip string `json:"clip"`
}


func run(message []byte, c *Client) {
	var action Action
	fmt.Println(string(message))
	d := "{\"action\":\"create_room\",\"test\":5}"
	err2 := json.Unmarshal([]byte(d), &action)
    if err2 != nil {
		fmt.Println(fmt.Sprintf("%#v", err2))
        log.Fatal(err2)
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
			room := &Room{name:actionRoom.room_name, clients: make(chan *Client)}
			c.hub.rooms[room] = true
		case "join_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
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