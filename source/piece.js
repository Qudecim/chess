import { Pawn } from './chessmen/pawn'
import { Knight } from './chessmen/knight'
import { King } from './chessmen/king'
import { Queen } from './chessmen/queen'
import { Bishop } from './chessmen/bishop'
import { Rook } from './chessmen/rook'
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

    sprite() {
        return this.piece.sprite
    }

    setActive() {
        this.active = true
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
}