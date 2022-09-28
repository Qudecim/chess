import ctrl from './ctrl';
import { Piece } from './piece'
import ws from './ws'

export default {

    canvas: null,
    ctx: null,
    cursor: {
        x: 0,
        y: 0,
        ox: 0,
        oy: 0,
    },
    active: null,
    block: 50,
    roomName: '',
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
    color: null,
    canMove: false,
    conn: null,

    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    },

    start() {
        

        for (let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (this.start_positions[v][h] !== null) {
                    this.board[v][h] = new Piece(this.start_positions[v][h][0], h, v, this.start_positions[v][h][1])
                }
            }
        }

        this.tic()
    },

    draw() {
        this.draw_board()
        this.draw_chessmen()
        this.draw_tips()
    },

    tic() {
        this.draw()
    },

    draw_board: function () {
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fillRect(0, 0, this.block * 8, this.block * 8);
        let sum = 0;
        for(let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (sum % 2 === -0) {
                    this.ctx.fillStyle = '#ceb29c';
                } else {
                    this.ctx.fillStyle = '#f5e6cf';
                }
                this.ctx.fillRect(h * this.block, v * this.block, this.block, this.block);
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
            this.board[this.active.v][this.active.h].drawTips()
        }
    },

    select(v, h) {
        if (!this.canMove) {return}
        if (this.board[v][h] !== null) {
            if (this.board[v][h].color !== this.color) {return}
            this.board[v][h].setActive()
            this.active = { v, h }
        }
    },

    move(v, h) {
        
        // Здесь будет проверка на возможность хода

        if (this.active) {
            
            if (this.board[this.active.v][this.active.h] !== null) {
                let steps = this.board[this.active.v][this.active.h].getSteps()

                for (let step of steps) {
                    if (step.h === h && step.v === v) {
                        this.board[this.active.v][this.active.h].go(h, v)
                        let from = { h: this.active.h, v: this.active.v }
                        let to = { h, v }
                        
                        ws.move(from, to)
                        this.canMove = false

                        this.active = { v, h }
                    }

                }
            }
            this.board[this.active.v][this.active.h].setDisactive()
            this.active = null
        }

    },

}