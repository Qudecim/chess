import { Pawn } from './chessmen/pawn'
import { Knight } from './chessmen/knight'
import { King } from './chessmen/king'
import { Queen } from './chessmen/queen'
import { Bishop } from './chessmen/bishop'
import { Rook } from './chessmen/rook'
import g from './g'
import res from "./res";
import control from "./control";

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
                this.piece = new Pawn;
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

            g.ctx.fillStyle = '#9cce9d';
            g.ctx.fillRect(this.h * g.block, this.v * g.block, g.block, g.block);


            g.ctx.drawImage(res.sprites.chessmen, 213 * data.sprite, 213 * this.color, 213, 213, g.cursor.x + g.cursor.ox, g.cursor.y + g.cursor.oy, g.block, g.block);
        } else {
            g.ctx.drawImage(res.sprites.chessmen, 213 * data.sprite, 213 * this.color, 213, 213, this.h * g.block, this.v * g.block, g.block, g.block);
        }


    }

    set_active() {
        this.active = true
    }

    set_disactive() {
        this.active = false
    }

    get_steps() {
        return this.piece.get_steps(this.color, this.h, this.v)
    }

    draw_tips() {
        let steps = this.get_steps(this.color, this.h, this.v)
        for (let i = 0; i < steps.length; i++) {
            g.ctx.fillStyle = '#9cc0ce';
            g.ctx.globalAlpha = 0.7;
            g.ctx.fillRect(steps[i].h * g.block, steps[i].v * g.block, g.block, g.block);
            g.ctx.globalAlpha = 1;
        }
    }

    go(h, v) {
        g.board[this.v][this.h] = null
        this.h = h
        this.v = v
        g.board[v][h] = this

        if (this.piece instanceof Pawn) {
            if (this.v === 0 || this.v === 7) {
                this.piece = new Queen()
            }
        }
    }

    move(h, v) {

    }

}