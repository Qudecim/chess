﻿package v1

import (
	"time"
	"bytes"
	"log"
	"github.com/gorilla/websocket"
	"github.com/qudecim/chess/internal/game/action"
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

	hub *Hub

	send chan []byte
}


func (c *Client) write() {

	// Ставим таймер для пинга
	ticker := time.NewTicker(pingPeriod)

	// При завершении функции, убиваем таймер и клиента
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:

			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			// Создаем новое сообщение
			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}

			// пишем сообщение
			w.Write(message)

			// Добавляем еще сообщения из очереди, если есть
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			// Закрываем врайтер
			if err := w.Close(); err != nil {
				return
			}

		// отправляем клиенту пинг
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (c *Client) read() {

	// При завершении функции убиваем коннект
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()


	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })


	for {
		// читаем сообщение
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		// Обрабатываем
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))

		// добавляем в буфер сообщений
		//c.hub.broadcast <- message

		game.Run(message)

	}
}