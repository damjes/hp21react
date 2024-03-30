import { useState } from "react";
import Wyświetlacz from "./Wyswietlacz"
import './App.sass'

type ZawartośćWyświetlacza = { napis: string, gdziePrzecinek: number }
type LiczbaWyświetlana = number | ZawartośćWyświetlacza

const długośćWyświetlacza = 12

function App() {
	const [poPrzecinku, _setPoPrzecinku] = useState(2)
	const [wykładnicza, _setWykładnicza] = useState(false)
	const [napisInputa, setNapisInputa] = useState('')
	const [liczba, setLiczba] = useState(0)

	function zapiszMantyse(napisSurowy: string, miejsce: number): [string, number] {
		const napisZeZnakiem = ((napisSurowy[0] === '-' ? '' : ' ') + napisSurowy)
		const gdziePrzecinek = napisZeZnakiem.indexOf('.') - 1
		const napis = napisZeZnakiem.replace('.', '').slice(0, miejsce - 1)

		return [napis, gdziePrzecinek]
	}

	function ustalZawartośćWyświetlacza(liczba: LiczbaWyświetlana): ZawartośćWyświetlacza {
		if(typeof liczba === 'object')
			return liczba // liczba jest w formie napisu

		if(!Number.isFinite(liczba))
			return {napis: ' Error', gdziePrzecinek: -1}

		const abs = Math.abs(liczba)

		if(abs < 1e-99) {
			return {napis: ' ' + '0'.repeat(poPrzecinku+1), gdziePrzecinek: 1}
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
		const [mantysaZeZnakiem, gdziePrzecinek] = zapiszMantyse(mantysa, długośćWyświetlacza - 3)
		const cechaZWiodącymZerem = cecha.slice(1).padStart(2, '0')
		const cechaZPoprawionymZnakiem = cecha[0].replace('+', ' ') + cechaZWiodącymZerem
		const napis = mantysaZeZnakiem.padEnd(długośćWyświetlacza - 3) + cechaZPoprawionymZnakiem

		return {napis, gdziePrzecinek}
	}

	function czyWykładniczaWStringu(napis: string): boolean {
		if(napis[-3] === '-')
			return true

		if(napis[-3] === ' ')
			return napis[-2] !== ' '

		return false
	}

	function konwertujNaLiczbę(napis: string): number {
		if(czyWykładniczaWStringu(napis)) {
			const mantysa = napis.slice(0, -3)
			const cecha = napis.slice(-3)
			const liczba = mantysa + 'e' + cecha
			return Number(liczba)
		} else {
			return Number(napis)
		}
	}

	const {napis, gdziePrzecinek} = ustalZawartośćWyświetlacza(liczba)
	
	return <>
		<Wyświetlacz napis={napis} przecinek={gdziePrzecinek} długość={długośćWyświetlacza} />
		<input type="text" name="napis" value={napisInputa} onChange={e => setNapisInputa(e.target.value)} />
		<p>{liczba}</p>
		<button onClick={() => setLiczba(konwertujNaLiczbę(napisInputa))}>Konwertuj</button>
	</>
}

export default App
