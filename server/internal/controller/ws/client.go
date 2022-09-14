package v1

import (
	"time"
	"bytes"
	"fmt"
	"log"
	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

type Client struct {

	conn *websocket.Conn

}

func (c *Client) close() {
	c.conn.Close()
}


func (c *Client) write() {

	for {
		time.Sleep(5000)
		c.conn.SetWriteDeadline(time.Now().Add(writeWait))
		w, err := c.conn.NextWriter(websocket.TextMessage)
		if err != nil {
			return
		}
		w.Write([]byte("test"))

		n := len([]byte("test"))
		for i := 0; i < n; i++ {
			w.Write(newline)
			w.Write([]byte("test"))
		}
		if err := w.Close(); err != nil {
			return
		}
	}

}

func (c *Client) read() {
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))

		fmt.Println(message)
	}
}