package main

type Room struct {

    name string

    board string

    clients map[*Client]bool

}

func createRoom(name string, board string, c *Client) Room {

    var room Room
    room.name = name
    room.board = board
    room.clients[c] = true

    return room

}