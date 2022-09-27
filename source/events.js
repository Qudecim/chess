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
        console.log(color)
        document.getElementById('wait').style.display = 'none'
    },

    end(isWin) {

    },

    move(from, to) {
        console.log(['Moooove', from, to])
        game.board[from.v][from.h].go(to.h, to.v)
    },

}