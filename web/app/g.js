import {Piece} from "./piece";

export default {
    block: 20,
    canvas: null,
    ctx: null,
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
                    console.log(this.start_positions[v][h][0]);
                    this.board[v][h] = new Piece(this.start_positions[v][h][0], h, v, this.start_positions[v][h][1])
                }
            }
        }
    },
    draw:function () {
        this.draw_board()
        this.draw_chessmen()
    },
    draw_board: function () {
        this.ctx.fillStyle = 'rgb(200, 0, 0)';

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
    tic: function () {
        this.draw()
    }
}