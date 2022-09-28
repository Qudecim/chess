import game from './game'
import dom from './gui/dom'

export default {

    run(data) {
        switch(data.action) {
            case 'move':
                this.move(data.from, data.to)
                break;
            case 'start':
                this.start(data.color)
                break;
            default:
                console.error('Event didnt find')
        }
    },

    start(color) {
        dom.wait(false)
        game.color = color
        game.canMove = (color == 0)
    },

    end(isWin) {

    },

    move(from, to) {
        game.board[from.v][from.h].go(to.h, to.v)
        game.canMove = true
    },

}