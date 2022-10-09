import { Piece } from './piece'
import ws from './ws'
import draw from './gui/draw'
import ctrl from './ctrl'
import dom from './gui/dom'

export default {

    active: null,
    block: 100,
    size: 1,
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
     * TODO: Имеет смысл получить возможные ходы здесь, 
     * для использования отрисовки подсказок, и проверки в move.
     * Соотвественно они уже должны быть проверены на шах
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
            dom.cursor('grabbing')
        }
    },

    /**
     * Ход
     * Вызывется при отжатии мыши
     * Проверяем есть ли сейчас активная фигура и находится ли она еще на нужном месте
     * Получаем возможные шаги фигуры и проверяем есть ли там текущая позиция над которой мы отпустили мышь
     * Перемещаем фигуру
     * Проверяем на шах, если да то откатываем всё, если нет шаха то отправляем данные о ходе на сервер
     * Меняем флаг canMove на ложь, поскольку теперь мы ждем хода противника
     * Дизактивируем активную фигуру
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
                        let oldPieceOnBox = this.board[v][h]
                        this.board[this.active.v][this.active.h].go(h, v)
                        if (this.isCheck(this.color)) {
                            // roll back
                            this.board[v][h].go(this.active.h, this.active.v)
                            this.board[v][h] = oldPieceOnBox
                        } else {
                            let from = { h: this.active.h, v: this.active.v }
                            let to = { h, v }
                            ws.move(from, to)
                            this.canMove = false
                            this.active = { v, h }
                            this.board[v][h]
                        }

                    }
                }
            }
            this.board[this.active.v][this.active.h].setDisactive()
            this.active = null
        }
        dom.cursor('default')
    },

    isCheck(color) {
        // получаем позицию короля
        // TODO: лучше хранить данные по корлю в переменной
        let kingPosition = null
        for (let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                if (this.board[v][h] === null) {continue}
                if (this.board[v][h].pieceName === 'king' && this.board[v][h].color === color) {
                    kingPosition = {v, h}
                }
            }
        }

        // Проверяем угражает ли чужая фигура королю
        // Перебираем все элементы борда
        for (let v = 0; v < 8; v++) {
            for (let h = 0; h < 8; h++) {
                // Если не нулл
                if (this.board[v][h] !== null) {
                    let piece = this.board[v][h]
                    // Если фигура другого цвета
                    if (piece.color !== color) {
                        let steps = piece.getSteps()
                        // Перебераем все возможные ходы, и смотрим не там ли король
                        for (let i = 0; i < steps.length; i++) {
                            if (steps[i].h === kingPosition.h && steps[i].v === kingPosition.v) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

}