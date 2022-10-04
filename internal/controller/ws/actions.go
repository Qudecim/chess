package v1

import (
	"encoding/json"
	"log"
	"fmt"
	"github.com/qudecim/chess/internal/data"
)

type Request struct {

	Action string  `json:"action"`

	CreateRoom ActionRoom `json:"create_room"`

	JoinRoom ActionRoom `json:"join_room"`

	LeaveRoom ActionRoom `json:"leave_room"`

	Move data.Move `json:"move"`

}

type ActionRoom struct {
	
	Room_name string `json:"room_name"`

}


func run(message []byte, c *Client) {
	var request Request
	fmt.Println("-------------------------")
	fmt.Println(string(message))
	err := json.Unmarshal(message, &request)
    if err != nil {
        log.Fatal(err)
    }
	fmt.Println(request)
	switch string(request.Action) {
		// Создание комнаты
		case "create_room":
			room := newRoom([]byte(request.CreateRoom.Room_name), c)
			c.hub.rooms[request.CreateRoom.Room_name] = room
			c.room = room

		// Присоедениться к комнате
		case "join_room":
			c.hub.rooms[request.JoinRoom.Room_name].black = c
			c.room = c.hub.rooms[request.JoinRoom.Room_name]
			c.room.Start()

		// Покинуть комнату
		case "leave_room":
			// TODO

		// Ход
		case "move":
			move := request.Move

			color := 0
			if (c.room.black == c) {
				color = 1
			}
			if (c.room.canMove != color) {
				return
			}

			if (color == 0) {
				c.room.canMove = 1
			} else {
				c.room.canMove = 0
			}
			
			isMove := c.room.game.Move(color, move,)

			if (isMove) {
				if (color == 0) {
					c.room.black.send <- message
				} else {
					c.room.white.send <- message
				}
			} else {
				fmt.Println("No possible move")
			}
			
		// Action не найден
		default:
			fmt.Println("default")
	}
}