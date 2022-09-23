import ws from './ws'

export default {
    create(name) {
        console.log('create room: ' + name);
        ws.createRoom(name)
    },
    join(name) {
        console.log('join room: ' + name);
        ws.joinRoom(name)
    }
}