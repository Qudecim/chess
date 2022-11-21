import game from '../game'
import draw from './draw'

export default {

    join(show) {
        if (show) {
            document.getElementById('join').style.display = 'block'
        } else {
            document.getElementById('join').style.display = 'none'
        }
    },

    wait(show) {
        if (show) {
            document.getElementById('wait').style.display = 'block'
        } else {
            document.getElementById('wait').style.display = 'none'
        }
    },

    cursor(type) {
        document.body.style.cursor = type;
    },

    resize() {

        if (window.innerWidth > 500 && window.innerHeight > 500) {
            let w = Math.min(window.innerWidth, window.innerHeight) * 0.75;
        } else {
            let w = Math.min(window.innerWidth, window.innerHeight);
        }
        
        draw.canvas.width = w
        draw.canvas.height = w

        game.block = w / 8
    },

    showChoose(show) {
        if (show) {
            document.getElementById('choose').style.display = 'block'
        } else {
            document.getElementById('choose').style.display = 'none'
        }
    },

    choosePiece(pieceName) {
        this.showChoose(false)
        game.move(game.moveBeforeChoose.v, game.moveBeforeChoose.h, pieceName)
    }

}