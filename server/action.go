package main

import (
	"fmt"
	"encoding/json"
)

type ResponseCreateRoom struct {

    name string

}

func getAction(c *Client, actionName string, message []byte) {

    switch actionName {
    	case "createRoom":
    	    var response ResponseCreateRoom
        	json.Unmarshal(message, &response)
        	//room := &createRoom(response.name, "board", c)
        	room := &Room{name:response.name, board:"board"}
    		c.hub.rooms[room] = true
        case "listRooms":
            fmt.Println("Linux.")
    	case "joinToRoom":
    		fmt.Println("Linux.")
        case "move":
            fmt.Println("Linux.")
    	default:
    		// freebsd, openbsd,
    		// plan9, windows...
    		fmt.Printf("%s.\n", actionName)
    	}


}