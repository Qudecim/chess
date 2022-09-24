import room from './room'
import game from './game'

export default {

    start() {
        document.getElementById('createRoom').addEventListener('click', (event) => {
            room.create(document.getElementById('roomName').value)
        })

        document.getElementById('joinRoom').addEventListener('click', (event) => {
            room.join(document.getElementById('roomName').value)
        })
        
        game.canvas.addEventListener("mousedown", this.down);
        game.canvas.addEventListener("mouseup", this.up);
        game.canvas.addEventListener("mousemove", this.move);
    },

    down(e) {
        let x = Math.floor(e.offsetX / game.block)
        let y = Math.floor(e.offsetY / game.block)
        game.cursor.ox = (x * game.block) - e.offsetX;
        game.cursor.oy = (y * game.block) - e.offsetY;
        console.log([x, y])
    },
    up(e) {
        let x = Math.floor(e.offsetX / game.block)
        let y = Math.floor(e.offsetY / game.block)
        console.log([x, y])
    },
    move(e) {
        game.cursor.x = e.offsetX
        game.cursor.y = e.offsetY
    }

}