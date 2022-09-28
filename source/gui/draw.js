import res from '../res'

export default {

    canvas: null,
    ctx: null,
    colors: {
        board: {
            black: '#ceb29c',
            white: '#f5e6cf',
            active: '#9cce9d',
            tip: '#9cc0ce'
        }
    },

    /**
     * Инициализация
     * */
    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    },

    /**
     * Основной метод для отрисовки
     * 
     * @param {any} boxSize
     * @param {any} board
     * @param {any} cursor
     * @param {any} active
     */
    draw(boxSize, board, cursor, active) {
        this.board(boxSize)
        this.chessmen(boxSize, board, cursor)
        this.tips(boxSize, board, active)
    },

    /**
     * Отрисовка доски
     * 
     * @param {any} boxSize
     */
    board(boxSize) {
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fillRect(0, 0, boxSize * 8, boxSize * 8);
        let sum = 0;
        for (let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (sum % 2 === -0) {
                    this.ctx.fillStyle = this.colors.board.black;
                } else {
                    this.ctx.fillStyle = this.colors.board.white;
                }
                this.ctx.fillRect(h * boxSize, v * boxSize, boxSize, boxSize);
                sum++;
            }
            sum++;
        }
    },

    /**
     * Отрисовка фигур
     * 
     * @param {any} boxSize
     * @param {any} board
     * @param {any} cursor
     */
    chessmen(boxSize, board, cursor) {
        for (let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (board[v][h] !== null) {
                    this.piece(board[v][h], boxSize, cursor)
                }
            }
        }
    },

    /**
     * Отрисовка фигуры
     * 
     * @param {any} piece
     * @param {any} boxSize
     * @param {any} cursor
     */
    piece(piece, boxSize, cursor) {
        if (piece.active) {
            this.ctx.fillStyle = this.colors.board.active;
            this.ctx.fillRect(piece.h * boxSize, piece.v * boxSize, boxSize, boxSize);
            this.ctx.drawImage(res.sprites.chessmen, 213 * piece.sprite(), 213 * piece.color, 213, 213, cursor.x + cursor.ox, cursor.y + cursor.oy, boxSize, boxSize);
        } else {
            this.ctx.drawImage(res.sprites.chessmen, 213 * piece.sprite(), 213 * piece.color, 213, 213, piece.h * boxSize, piece.v * boxSize, boxSize, boxSize);
        }
    },

    /**
     * Отрисовка подсказок
     * 
     * @param {any} boxSize
     * @param {any} board
     * @param {any} active
     */
    tips(boxSize, board, active) {
        if (active !== null) {
            let steps = board[active.v][active.h].getSteps()
            for (let i = 0; i < steps.length; i++) {
                this.ctx.fillStyle = this.colors.board.tip;
                this.ctx.globalAlpha = 0.7;
                this.ctx.fillRect(steps[i].h * boxSize, steps[i].v * boxSize, boxSize, boxSize);
                this.ctx.globalAlpha = 1;
            }
        }
    },

}