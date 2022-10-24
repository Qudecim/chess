import game from './game'
import dom from './gui/dom'
import { Piece } from './piece';

export default {

    run(data) {
        console.log(data);
        switch(data.action) {
            case 'move':
                this.move(data.move.from, data.move.to, data.move.selectPiece)
                break;
            case 'start':
                this.start(data.start_game.color)
                break;
            case 'end':
                this.end(data.end)
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
    end(end) {
        if (end == 1) {
            window.alert("You won");
        }
        if (end == 2) {
            window.alert("Draw");
        }
        if (end == 3) {
            window.alert("You lose");
        }
    },

    // Ход противника
    move(from, to, selectPiece) {
        game.board[from.v][from.h].go(to.h, to.v)
        game.canMove = true

        // exception for castling
        if (game.board[to.v][to.h].pieceName == 'king') {
            if (Math.abs(to.h - from.h) > 1) {
                if (to.h > from.h) {  // 
                    game.board[from.v][7].go(to.h - 1, to.v)
                } else {
                    game.board[from.v][0].go(to.h + 1, to.v)
                }
            }
        }

        // exception for change pawn
        if (game.board[to.v][to.h].pieceName == 'pawn') {
            if (selectPiece != '') {
                if (to.v == 0 || to.v == 7) {
                    game.board[to.v][to.h] = new Piece(selectPiece, to.h, to.v, game.color? 0 : 1)
                }
            }
        }

    },

}