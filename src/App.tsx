import { useState } from "react";
import Wyświetlacz from "./Wyswietlacz"
import './App.sass'
import DebugWyswietlacza from "./DebugWyswietlacza";

type ZawartośćWyświetlacza = { napis: string, gdziePrzecinek: number }
type LiczbaWyświetlana = number | ZawartośćWyświetlacza

const długośćWyświetlacza = 12

const cyfry = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function App() {
	const [poPrzecinku, setPoPrzecinku] = useState(2)
	const [wykładnicza, setWykładnicza] = useState(false)
	const [x, setX] = useState<LiczbaWyświetlana>({napis: " 12345678   ", gdziePrzecinek: 4})

	function zapiszMantyse(napisSurowy: string, miejsce: number): [string, number] {
		console.log('napisSurowy', napisSurowy, 'miejsce', miejsce)
		console.log('długość', napisSurowy.length)
		const napisZeZnakiem = ((napisSurowy[0] === '-' ? '' : ' ') + napisSurowy)
		const szukajPrzecinka = napisZeZnakiem.indexOf('.') - 1
		console.log('szukajPrzecinka', szukajPrzecinka)
		const gdziePrzecinek = szukajPrzecinka === -1-1 ? napisSurowy.length : szukajPrzecinka
		const napis = napisZeZnakiem.replace('.', '').slice(0, miejsce - 1)

		return [napis, gdziePrzecinek]
	}

	function ustalZawartośćWyświetlacza(liczba: LiczbaWyświetlana): ZawartośćWyświetlacza {
		if(typeof liczba === 'object') {
			if(liczba.gdziePrzecinek !== -1)
				return liczba

			const napis = liczba.napis.replace('-', ' ')
			return {napis, gdziePrzecinek: napis.indexOf(' ', 1) -1 }
		}

		if(!Number.isFinite(liczba))
			return {napis: ' Error', gdziePrzecinek: -1}

		const abs = Math.abs(liczba)

		if(abs < 1e-99) {
			const długośćMantysy = długośćWyświetlacza - (wykładnicza ? 2 : 0) - 2
			const mantysa = ' ' + '0'
				.repeat(poPrzecinku+1)
				.slice(0, długośćMantysy)
				.padEnd(długośćMantysy, ' ')
			const cecha = wykładnicza ? ' 00' : ' '

			return {napis: mantysa+cecha, gdziePrzecinek: 1}
		}

		if(abs > 1e99) {
			const znak = liczba > 0 ? ' ' : '-'
			const mantysa = '9'.repeat(długośćWyświetlacza - 4)
			const wykładnik = '99'
			const napis = znak + mantysa + ' ' + wykładnik
			return {napis, gdziePrzecinek: 1}
		}

		if(!wykładnicza && abs > Math.pow(10, -poPrzecinku) && abs < Math.pow(10, długośćWyświetlacza - 2)){
			const napisSurowy = liczba.toFixed(poPrzecinku)
			const [napis, gdziePrzecinek] = zapiszMantyse(napisSurowy, długośćWyświetlacza)
			return {napis, gdziePrzecinek}
		}

		const [mantysa, cecha] = liczba.toExponential(poPrzecinku).split('e')
		const [mantysaZeZnakiem, gdziePrzecinek] = zapiszMantyse(mantysa, długośćWyświetlacza - 2)
		const cechaZWiodącymZerem = cecha.slice(1).padStart(2, '0')
		const cechaZPoprawionymZnakiem = cecha[0].replace('+', ' ') + cechaZWiodącymZerem
		const napis = mantysaZeZnakiem.padEnd(długośćWyświetlacza - 3) + cechaZPoprawionymZnakiem

		return {napis, gdziePrzecinek}
	}

	function czyWykładniczaWStringu(napis: string): boolean {
		if(napis[napis.length-3] === '-')
			return true

		if(napis[napis.length-3] === ' ')
			return napis[napis.length-2] !== ' '

		return false
	}

	function konwertujMantysęNaLiczbę(napis: string, gdziePrzecinek: number): number {
		console.log('konwertujMantysęNaLiczbę', napis, gdziePrzecinek)

		if(gdziePrzecinek === -1)
			return Number(napis)

		const mantysa = napis.slice(0, gdziePrzecinek+1) + '.' + napis.slice(gdziePrzecinek+1)
		return Number(mantysa)
	}

	function konwertujNaLiczbę(napis: string, gdziePrzecinek: number): number {
		if(czyWykładniczaWStringu(napis)) {
			const mantysa = konwertujMantysęNaLiczbę(napis.slice(0, -3), gdziePrzecinek)
			const cecha = napis.slice(-3).replace(' ', '+')
			const liczba = mantysa + 'e' + cecha
			console.log('liczba', '"'+liczba+'"')
			return Number(liczba)
		} else {
			return konwertujMantysęNaLiczbę(napis, gdziePrzecinek)
		}
	}

	function wprowadź(znak: string) {
		const {napis, gdziePrzecinek} = typeof x === 'object' ? x : {
			napis: ' '.repeat(długośćWyświetlacza),
			gdziePrzecinek: -1
		}

		if(znak === 'enter') {
			setX(konwertujNaLiczbę(napis, gdziePrzecinek))
			return
		}

		console.log('napis', '"'+napis+'"')
		console.log('gdziePrzecinek', gdziePrzecinek)
		console.log('czyWykładniczaWStringu(napis)', czyWykładniczaWStringu(napis))

		if(czyWykładniczaWStringu(napis)) {
			if(znak === '-') {
				const mantysa = napis.slice(0, -3) // nie używamy konwertujMantysęNaLiczbę, bo chcemy stringa bez przecinka na potrzeby wyświetlacza
				const cecha = napis.slice(-2)
				const znakCechy = napis[napis.length-3] === ' ' ? '-' : ' '
				const nowyNapis = mantysa + znakCechy + cecha
				setX({napis: nowyNapis, gdziePrzecinek})
				return
			}

			if(!cyfry.includes(znak))
				return

			const mantysa = napis.slice(0, -3)
			const nowyNapis = mantysa + napis[napis.length-3] +napis[napis.length-1] + znak
			setX({napis: nowyNapis, gdziePrzecinek})
		}

		// TODO
		if(znak === 'eex') {
			setX({napis: napis+' 00', gdziePrzecinek})
			return
		}

		if(znak === '-') {
			const znak = napis[0] === ' ' ? '-' : ' '
			const nowyNapis = znak + napis.slice(1)
			setX({napis: nowyNapis, gdziePrzecinek})
			return
		}
	}

	const {napis, gdziePrzecinek} = ustalZawartośćWyświetlacza(x)

	return <>
		<Wyświetlacz napis={napis} przecinek={gdziePrzecinek} długość={długośćWyświetlacza} />
		<p>
			<input type="checkbox" checked={wykładnicza} onChange={e => setWykładnicza(e.target.checked)} />
			Notacja wykładnicza Po przecinku:
			<input
				type="number"
				value={poPrzecinku}
				onChange={e => setPoPrzecinku(Number(e.target.value))}
				min={0}
				max={9}
				/>
		</p>
			<DebugWyswietlacza x={x} setX={setX} />
		<p>
			<button onClick={() => wprowadź('7')}>7</button>
			<button onClick={() => wprowadź('8')}>8</button>
			<button onClick={() => wprowadź('9')}>9</button>
		</p>
		<p>
			<button onClick={() => wprowadź('4')}>4</button>
			<button onClick={() => wprowadź('5')}>5</button>
			<button onClick={() => wprowadź('6')}>6</button>
		</p>
		<p>
			<button onClick={() => wprowadź('1')}>1</button>
			<button onClick={() => wprowadź('2')}>2</button>
			<button onClick={() => wprowadź('3')}>3</button>
		</p>
		<p>
			<button onClick={() => wprowadź('0')}>0</button>
			<button onClick={() => wprowadź('.')}>.</button>
			<button onClick={() => wprowadź('-')}>+/-</button>
		</p>
		<p>
			<button onClick={() => wprowadź('enter')}>enter</button>
			<button onClick={() => wprowadź('eex')}>eex</button>
		</p>
	</>
}

export default App
