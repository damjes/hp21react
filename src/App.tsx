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
	const liczba = napisInputa

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
		const cechaZPoprawionymZnakiem = cecha.replace('+', ' ')
		const napis = mantysaZeZnakiem.padEnd(długośćWyświetlacza - 3) + cechaZPoprawionymZnakiem

		return {napis, gdziePrzecinek}
	}

	const {napis, gdziePrzecinek} = ustalZawartośćWyświetlacza({napis: liczba, gdziePrzecinek: -1})
	
	return <>
		<Wyświetlacz napis={napis} przecinek={gdziePrzecinek} długość={długośćWyświetlacza} />
		<input type="text" name="napis" value={napisInputa} onChange={e => setNapisInputa(e.target.value)} />
		<p>{liczba}</p>
	</>
}

export default App
