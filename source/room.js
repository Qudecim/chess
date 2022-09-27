import ws from './ws'

export default {
    create(name) {
        console.log('create room: ' + name);
        ws.createRoom(name)
        document.getElementById('join').style.display = 'none'
        document.getElementById('wait').style.display = 'block'
    },
    join(name) {
        console.log('join room: ' + name);
        ws.joinRoom(name)
        document.getElementById('join').style.display = 'none'
        document.getElementById('wait').style.display = 'block'
    }
}