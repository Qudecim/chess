import game from './game'

export default {

    run(message) {
        console.log(message)
        switch(message.action) {
            case 'move':
                console.log('move')
                this.move(message.from, message.to)
                break;
            case 'start':
                this.start(message.color)
                break;
            default:
                console.error('Event didnt find')
        }
    },

    start(color) {
        document.getElementById('wait').style.display = 'none'
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