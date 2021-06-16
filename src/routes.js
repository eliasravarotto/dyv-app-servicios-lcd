import Home from './pages/Home'
import LcdTurnos from './pages/LcdTurnos'
import LcdLavadero from './pages/LcdLavadero'

export const rutas = [
	{ path: '', component: Home },
	{ path: '/lcd-turnos', component: LcdTurnos, name: 'lcd_turnos' },
	{ path: '/lcd-lavadero', component: LcdLavadero, name: 'lcd_lavadero' },
]