import game from './game'
import dom from './gui/dom'

export default {

    run(data) {
        console.log(data);
        switch(data.action) {
            case 'move':
                this.move(data.move.from, data.move.to)
                break;
            case 'start':
                this.start(data.start_game.color)
                break;
            case 'end':
                this.end(data.you_win)
                break;
            default:
                console.error('Event didnt find')
        }
    },

    // Начало игры
    start(color) {
        dom.wait(false)
        game.color = color
        game.canMove = (color == 0)
    },

    // Конец игры
    end(isWin) {
        if (isWin) {
            window.alert("You won");
        } else {
            window.alert("You lose");
        }
        
    },

    // Ход противника
    move(from, to) {
        game.board[from.v][from.h].go(to.h, to.v)
        game.canMove = true
    },

}