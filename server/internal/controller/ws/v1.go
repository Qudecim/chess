package v1

import (
    "log"
    "flag"
    "fmt"
    "net/http"
    "github.com/gorilla/websocket"
)

var addr = flag.String("addr", ":80", "http service address")

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func Init() {

	fmt.Println("Init ws")

    http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		handler(w, r)
	})

    err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {

    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }

    client := &Client{conn:conn}
    
    defer client.close()
    go client.write()
    client.read()

}