import events from './events'

export default {

    conn: null,

    init() {
        this.conn = new WebSocket("ws://localhost/ws");
        this.conn.onclose = function (evt) {
            console.warn('Connection closed')
        }
        this.conn.onopen = function (evt) {
            console.log('Socket connected')
        }
        this.conn.onmessage = function (evt) {
            let data = JSON.parse(evt.data)
            console.log(evt.data)
            events.run(data)
        }
    },

    joinRoom(name) {
        this.send('join_room', { 'create_room': { 'room_name':name } })
    },

    createRoom(name) {
        this.send('create_room', { 'join_room': {'room_name': name} })
    },

    move(from, to, selectPiece) {
        this.send('move', {'move':{ from, to, selectPiece }})
    },

    changePawn(pieceName) {
        this.send('change_pawn', { '': {'name': pieceName} })
    },

    send(method, data) {

        let send_data = {
            ...{ 'action': method },
            ...data
        }

        let send_json = JSON.stringify(send_data)

        this.conn.send(send_json)
    }

}