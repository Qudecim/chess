import { Piece } from './piece'
import ws from './ws'
import draw from './gui/draw'
import ctrl from './ctrl'

export default {

    active: null,
    block: 50,
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

    /**
     * Инициализация
     * Перебираем стартовые позиции и создаем объекты фигур
     * Стартуем таймер для отрисовки
     */
    init() {
        for (let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (this.start_positions[v][h] !== null) {
                    this.board[v][h] = new Piece(this.start_positions[v][h][0], h, v, this.start_positions[v][h][1])
                }
            }
        }

        this.tic()
    },

    /**
     * Функция вызывается по таймеру, используется для отрисовки
     */
    tic() {
        draw.draw(this.block, this.board, ctrl.cursor, this.active)
    },

    /**
     * Выбираем фигуру
     * Функция вызывается при зажатии мыши на канвас
     * Проверякм можем ли мы ходить
     * Проверяем есть ли фигура под мышью
     * Проверяем нашего ли она цвета
     * Делаем эту фигуру активной
     * 
     * @param {*} v 
     * @param {*} h 
     * @returns 
     */
    select(v, h) {
        if (!this.canMove) {return}
        if (this.board[v][h] !== null) {
            if (this.board[v][h].color !== this.color) {return}
            this.board[v][h].setActive()
            this.active = { v, h }
        }
    },

    /**
     * Ход
     * Вызывется при отжатии мыши
     * Проверяем есть ли сейчас активная фигура и находится ли она еще на нужном месте
     * Получаем возможные шаги фигуры и проверяем есть ли там текущая позиция над которой мы отпустили мышь
     * Если есть то мы перемещаем фигуру и отправляем данные о ходе на сервер
     * Меняем флаг canMove на ложь, поскольку теперь мы ждем хода противника
     * Дизактивируем активную фигуру
     * 
     * 
     * @param {*} v 
     * @param {*} h 
     */
    move(v, h) {
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