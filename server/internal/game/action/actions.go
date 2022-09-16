package game

import (
	"encoding/json"
	"log"
	"fmt"
)

type Action struct {

	action string

}

type ActionRoom struct {
	
	room_name string

}

type Moves struct {

	v int
	h int
}

type ActionMove struct {

	from Moves
	to Moves

}

func Run(message []byte) {
	var action Action

	err := json.Unmarshal(message, &action)
    if err != nil {
 
        log.Fatal(err)
    }
	fmt.Println(action)
	switch string(action.action) {
		case "create_room":
			var actionRoom ActionRoom
			err := json.Unmarshal(message, &actionRoom)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println("create_room")
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