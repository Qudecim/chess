import g from './g'
import control from "./control";

g.start()
g.canvas.addEventListener("click", control.click);

function tic() {
	g.tic()

	setTimeout(tic, 100)
}

tic()