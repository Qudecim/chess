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

        let w = Math.min(window.innerWidth, window.innerHeight) * 0.75;

        draw.canvas.width = w
        draw.canvas.height = w

        game.block = w / 8
    }

}