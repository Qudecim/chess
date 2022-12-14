import { Piece } from './piece'
import ws from './ws'
import draw from './gui/draw'
import ctrl from './ctrl'
import dom from './gui/dom'

export default {

    active: null,
    block: 100,
    size: 1,
    tips: [],
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
    moveBeforeChoose: {
        h: 0,
        v: 0
    },
    lastMove: {
        from: {v:0, h:0},
        to: {v:0, h:0}
    },
    isPhone: false,



    /**
     * Инициализация
     * Перебираем стартовые позиции и создаем объекты фигур
     * Стартуем таймер для отрисовки
     */
    init() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.isPhone = true
        }
        console.log({isPhone:this.isPhone})

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
        draw.draw(this.block, this.board, ctrl.cursor, this.active, this.tips)
    },

    /**
     * Выбираем фигуру
     * Функция вызывается при зажатии мыши на канвас
     * Проверякм можем ли мы ходить
     * Проверяем есть ли фигура под мышью
     * Проверяем нашего ли она цвета
     * Делаем эту фигуру активной
     * 
     * TODO: Нужна проверка подсказок на шах
     * 
     * @param {*} v 
     * @param {*} h 
     * @returns 
     */
    select(v, h) {
        if (!this.canMove) {return}        
        if (this.board[v][h] !== null) {
            console.log(this.board[v][h])
            if (this.board[v][h].color !== this.color) {return}
            this.board[v][h].setActive()
            let isCheck = this.isCheck(this.color)
            this.tips = this.board[v][h].getSteps(isCheck)
            this.active = { v, h }
            dom.cursor('grabbing')
        }
    },

    selectPhone(v,h) {
        if (!this.canMove) {return}
        if (this.board[v][h] !== null) {
            if (this.board[v][h].color === this.color) {
                this.board[v][h].setActive()
                let isCheck = this.isCheck(this.color)
                this.tips = this.board[v][h].getSteps(isCheck)
                this.active = { v, h }
            } else {
                this.move(v,h)
            }
        } else {
            this.move(v,h)
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
     * @param {*} selectPiece // используется только при смене пешки на другую фигуру
     */
    move(v, h, selectPiece = '') {
        if (this.active) {
            if (this.board[this.active.v][this.active.h] !== null) {
                let isCheck = this.isCheck(this.color)
                let steps = this.board[this.active.v][this.active.h].getSteps(isCheck)

                let isCanMove = false
                let isPawnPass = false
                for (let step of steps) {
                    if (step.h === h && step.v === v) {
                        isCanMove = true
                        isPawnPass = step.pawnPass
                    }
                }

                if (isCanMove) {

                    // Pawn change to another piece
                    if (selectPiece == '') {
                        if (this.board[this.active.v][this.active.h].pieceName == 'pawn') {
                            if (v == 0 || v == 7) {
                                this.moveBeforeChoose = {v, h}
                                dom.showChoose(true)
                                return;
                            }
                        }
                    }

                    let oldPieceOnBox = this.board[v][h]
                    this.board[this.active.v][this.active.h].go(h, v)

                    // exception for castling
                    let isCastling = false
                    let isCastlingLeft = false
                    if (this.board[v][h].pieceName == 'king') {
                        if (Math.abs(h - this.active.h) > 1) {
                            if (h > this.active.h) {  // 
                                this.board[this.active.v][7].go(h - 1, v)
                            } else {
                                this.board[this.active.v][0].go(h + 1, v)
                                isCastlingLeft = true
                            }
                            isCastling = true
                        }
                    }


                    if (this.isCheck(this.color)) {
                        // roll back
                        this.board[v][h].go(this.active.h, this.active.v)
                        this.board[v][h] = oldPieceOnBox

                        if (isCastling) {
                            if (isCastlingLeft) {
                                this.board[v][h+1].go(0, this.active.v)
                            } else {
                                this.board[v][h-1].go(7, this.active.v)
                            }
                        }
                    } else {

                        let from = { h: this.active.h, v: this.active.v }
                        let to = { h, v }
                        ws.move(from, to, selectPiece)

                        this.lastMove = {from, to}
                        this.canMove = false
                        this.active = { v, h }
                        this.board[v][h].moved = true

                        if (selectPiece != '') {
                            this.board[to.v][to.h] = new Piece(selectPiece, h, v, this.color)
                        }
                        
                        if (isPawnPass) {
                            let ov = this.color ? -1 : 1
                            this.board[to.v + ov][to.h] = null
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
        let l = 0;

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
            for (let h = 0; h < 7; h++) {
                // Если не нулл
                if (this.board[v][h] !== null) {
                    let piece = this.board[v][h]
                    // Если фигура другого цвета
                    if (piece.color !== color) {
                        l++;

                        let steps = piece.getSteps(false)
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