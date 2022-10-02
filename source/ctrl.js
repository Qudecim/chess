import room from './room'
import game from './game'
import draw from './gui/draw'

export default {

    cursor: {
        x: 0,
        y: 0,
        ox: 0,
        oy: 0,
    },

    init() {
        document.getElementById('createRoom').addEventListener('click', (event) => {
            room.create(document.getElementById('roomName').value)
        })

        document.getElementById('joinRoom').addEventListener('click', (event) => {
            room.join(document.getElementById('roomName').value)
        })
        
        draw.canvas.addEventListener("mousedown", (e) => {
            this.down(e)
        });
        draw.canvas.addEventListener("mouseup", (e) => {
            this.up(e)
        });
        draw.canvas.addEventListener("mousemove", (e) => {
            this.move(e)
        });
    },

    down(e) {
        let x = Math.floor(e.offsetX / game.block)
        let y = Math.floor(e.offsetY / game.block)
        this.cursor.ox = (x * game.block) - e.offsetX;
        this.cursor.oy = (y * game.block) - e.offsetY;

        game.select(y,x)
    },
    up(e) {
        let x = Math.floor(e.offsetX / game.block)
        let y = Math.floor(e.offsetY / game.block)

        game.move(y, x)
    },
    move(e) {
        this.cursor.x = e.offsetX
        this.cursor.y = e.offsetY
    }

}