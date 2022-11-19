import room from './room'
import game from './game'
import draw from './gui/draw'
import dom from './gui/dom'

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

        if (!game.isPhone) {
            draw.canvas.addEventListener("mousedown", (e) => {
                console.log('mousedown');
                console.log(e);
                this.down(e)
            });
            draw.canvas.addEventListener("mouseup", (e) => {
                console.log('mouseup');
                this.up(e)
            });
            draw.canvas.addEventListener("mousemove", (e) => {
                console.log('mousemove');
                this.move(e)
            });
        } else {
            draw.canvas.addEventListener("touchstart", (e) => {
                console.log('touchstart');
                console.log(e);
                let position = e.target.getBoundingClientRect()
                let customEvent = {
                    offsetX: e.touches[0].clientX - position.x,
                    offsetY: e.touches[0].clientY - position.y,
                }
                this.down(customEvent)
            });
            draw.canvas.addEventListener("touchend", (e) => {
                let customEvent = {
                    offsetX: e.changedTouches[0].clientX,
                    offsetY: e.changedTouches[0].clientY,
                }
                //this.touched(customEvent)
            });
            draw.canvas.addEventListener("touchmove", (e) => {
                console.log('touchmove');
                let position = e.target.getBoundingClientRect()
                let customEvent = {
                    offsetX: e.touches[0].clientX - position.x,
                    offsetY: e.touches[0].clientY - position.y,
                }
                this.move(customEvent)
            });
        }

        document.getElementById('choose_queen').addEventListener('click', (event) => {
            dom.choosePiece('queen')
        })

        document.getElementById('choose_bishop').addEventListener('click', (event) => {
            dom.choosePiece('bishop')
        })

        document.getElementById('choose_knight').addEventListener('click', (event) => {
            dom.choosePiece('knight')
        })

        document.getElementById('choose_rook').addEventListener('click', (event) => {
            dom.choosePiece('rook')
        })

        window.addEventListener("resize", (e) => {
            dom.resize()
        });
    },

    down(e) {
        let x = Math.floor(e.offsetX / game.block)
        let y = Math.floor(e.offsetY / game.block)
        this.cursor.ox = (x * game.block) - e.offsetX;
        this.cursor.oy = (y * game.block) - e.offsetY;
        console.log({x:e.offsetX,y:e.offsetY});
        if (!game.isPhone) {
            game.select(y,x)
        } else {
            game.selectPhone(y, x)
        }

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