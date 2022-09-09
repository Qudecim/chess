package app

import (
	"flag"
	"log"
	"net/http"
	"fmt"
	"github.com/Qudecim/chess/internal/app"
)

var addr = flag.String("addr", ":80", "port")

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func run() {

	flag.Parse()

	hub := newHub()
	go hub.run()
	//go hub.tic()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
	
}

func handler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
	fmt.Println(fmt.Sprintf("%#v", conn))
}