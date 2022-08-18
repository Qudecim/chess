import g from './g'

g.start()

function tic() {
	g.tic()

	setTimeout(tic, 100)
}

tic()