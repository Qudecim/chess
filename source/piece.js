import { Pawn } from './chessmen/pawn'
import { Knight } from './chessmen/knight'
import { King } from './chessmen/king'
import { Queen } from './chessmen/queen'
import { Bishop } from './chessmen/bishop'
import { Rook } from './chessmen/rook'
import res from './res'
import game from './game'

export class Piece {

    color = 0
    v = 0
    h = 0
    piece = null
    active = false

    constructor(piece, h, v, color) {
        this.h = h
        this.v = v
        this.color = color
        switch (piece) {
            case 'pawn':
                this.piece = new Pawn();
                break
            case 'knight':
                this.piece = new Knight();
                break
            case 'king':
                this.piece = new King();
                break
            case 'queen':
                this.piece = new Queen();
                break
            case 'bishop':
                this.piece = new Bishop();
                break
            case 'rook':
                this.piece = new Rook();
                break
            default:
                console.error("Didn't find piece");
        }
    }

    draw() {
        let data = this.piece.draw();
        if (this.active) {

            game.ctx.fillStyle = '#9cce9d';
            game.ctx.fillRect(this.h * game.block, this.v * game.block, game.block, game.block);


            game.ctx.drawImage(res.sprites.chessmen, 213 * data.sprite, 213 * this.color, 213, 213, game.cursor.x + game.cursor.ox, game.cursor.y + game.cursor.oy, game.block, game.block);
        } else {
            game.ctx.drawImage(res.sprites.chessmen, 213 * data.sprite, 213 * this.color, 213, 213, this.h * game.block, this.v * game.block, game.block, game.block);
        }
    }

    setActive() {
        this.active = true
        console.log('t3');
    }

    setDisactive() {
        this.active = false
    }

    getSteps() {
        return this.piece.getSteps(this.color, this.v, this.h)
    }

    go(h, v) {
        game.board[this.v][this.h] = null
        this.h = h
        this.v = v
        game.board[v][h] = this
    }

    drawTips() {
        let steps = this.getSteps()
        for (let i = 0; i < steps.length; i++) {
            game.ctx.fillStyle = '#9cc0ce';
            game.ctx.globalAlpha = 0.7;
            game.ctx.fillRect(steps[i].h * game.block, steps[i].v * game.block, game.block, game.block);
            game.ctx.globalAlpha = 1;
        }
    }

}