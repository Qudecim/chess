import { Pawn } from './chessmen/pawn'
import { Knight } from './chessmen/knight'
import { King } from './chessmen/king'
import { Queen } from './chessmen/queen'
import { Bishop } from './chessmen/bishop'
import { Rook } from './chessmen/rook'
import res from './res'

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
        g.ctx.drawImage(res.sprites.chessmen, 213 * data.sprite, 213 * this.color, 213, 213, this.h * g.block, this.v * g.block, g.block, g.block);
    }

}