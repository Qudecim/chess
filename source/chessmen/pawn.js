import game from './../game'

export class Pawn {

    sprite = 5

    getSteps(color, v, h, isCheck) {
        let steps = [];
        let step_line = (color ? 1 : -1) + v

        if (color === 0) {
            if (v === 6) {
                if (game.board[step_line - 1][h] === null) {
                    steps.push({ v: step_line - 1, h: h })
                }
            }
        }

        if (color === 1) {
            if (v === 1) {
                if (game.board[step_line + 1][h] === null) {
                    steps.push({ v: step_line + 1, h: h })
                }
            }
        }

        if (game.board[step_line][h] === null) {
            steps.push({ v: step_line, h: h })
        }

        for (let step of [-1, +1]) {
            let h_position = h + step
            if (h_position < 0 || h_position > 7) {
                continue
            }

            if (game.board[step_line][h_position] !== null && game.board[step_line][h_position].color !== color) {
                steps.push({ v: step_line, h: h_position })
            }
        }

        // Срубить в проход
        if (game.board[game.lastMove.to.v][game.lastMove.to.h].pieceName == 'pawn') {

            if (game.lastMove.to.v == 3 && game.lastMove.from.v == 1) {
                if (color == 0) {
                    if (v == 3) {
                        if (h - 1 == game.lastMove.to.h) {
                            steps.push({ v: 2, h: h - 1 })
                        }
                        if (h + 1 == game.lastMove.to.h) {
                            steps.push({ v: 2, h: h + 1 })
                        }
                    }
                }
            }

            if (game.lastMove.to.v == 4 && game.lastMove.from.v == 6) {
                if (color == 1) {
                    if (v == 4) {
                        if (h - 1 == game.lastMove.to.h) {
                            steps.push({ v: 5, h: h - 1 })
                        }
                        if (h + 1 == game.lastMove.to.h) {
                            steps.push({ v: 5, h: h + 1 })
                        }
                    }
                }

            }
        }



        return steps;
    }

}