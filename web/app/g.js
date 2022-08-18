import {Piece} from "./piece";

export default {
    block: 50,
    canvas: null,
    ctx: null,
    active: null,
    board: [
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
    ],
    start_positions: [
        [['rook', 1],['knight', 1],['bishop', 1],['queen', 1],['king', 1],['bishop', 1],['knight', 1],['rook', 1]],
        [['pawn', 1],['pawn', 1],['pawn', 1],['pawn', 1],['pawn', 1],['pawn', 1],['pawn', 1],['pawn', 1]],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [['pawn', 0],['pawn', 0],['pawn', 0],['pawn', 0],['pawn', 0],['pawn', 0],['pawn', 0],['pawn', 0]],
        [['rook', 0],['knight', 0],['bishop', 0],['queen', 0],['king', 0],['bishop', 0],['knight', 0],['rook', 0]],
    ],
    start: function () {
        this.canvas = document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');

        for (let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (this.start_positions[v][h] !== null) {
                    this.board[v][h] = new Piece(this.start_positions[v][h][0], h, v, this.start_positions[v][h][1])
                }
            }
        }
    },
    draw:function () {
        this.draw_board()
        this.draw_chessmen()
        this.draw_tips()
    },
    draw_board: function () {
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fillRect(0, 0, this.block * 8, this.block * 8);

        this.ctx.fillStyle = 'rgb(0, 0, 0)';

        let sum = 0;
        for(let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (sum % 2 === -0) {
                    this.ctx.fillRect(h * this.block, v * this.block, this.block, this.block);
                }
                sum++;
            }
            sum++;
        }
    },
    draw_chessmen: function () {
        for(let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {

                if (this.board[v][h] !== null) {
                    this.board[v][h].draw()
                }

            }
        }
    },
    draw_tips: function () {
        if (this.active !== null) {
            this.board[this.active.v][this.active.h].draw_tips()
        }
    },
    set_active: function (h,v) {

        if (this.active === null) {
            this.board[v][h].set_active()
            this.active = {v, h}
        } else {
            let go = false
            console.log(this.active.v,this.active.h)
            if (this.board[this.active.v][this.active.h] !== null) {
                let steps = this.board[this.active.v][this.active.h].get_steps()

                for (let step of steps) {
                    if (step.h === h && step.v === v) {
                        this.board[this.active.v][this.active.h].go(h, v)
                        this.active = {v, h}
                        go = true
                    }

                }
            }

            if (!go) {
                this.board[this.active.v][this.active.h].set_disactive()
                this.active = null
            }

        }

    },
    tic: function () {
        this.draw()
    }
}