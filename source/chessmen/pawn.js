import game from './../game'

export class Pawn {

    draw() {
        return {
            sprite: 5
        };
    }

    getSteps(color, v, h) {
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

        return steps;
    }

}