import room from './room'

export default {

    start() {
        document.getElementById('createRoom').addEventListener('click', (event) => {
            room.create(document.getElementById('roomName').value)
        })

        document.getElementById('joinRoom').addEventListener('click', (event) => {
            room.join(document.getElementById('roomName').value)
        })
    }

}