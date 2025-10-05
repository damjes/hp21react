type ZawartośćWyświetlacza = { napis: string; gdziePrzecinek: number }
type LiczbaWyświetlana = number | ZawartośćWyświetlacza

function DebugWyswietlacza({x, setX}: {	x: LiczbaWyświetlana, setX: (x: LiczbaWyświetlana) => void}) {
	function daj123Napis() {
		 setX({ napis: '123', gdziePrzecinek: 2 })
	}

	function daj123Liczbe() {
		 setX(123)
	}

	const przed = <h2>Debug Wyswietlacza</h2>
	const po = <p>
		<button onClick={daj123Napis}>Daj 123 napis</button>
		<button onClick={daj123Liczbe}>Daj 123 liczbę</button>
	</p>

	if(typeof x === 'number') {
		function zmieńLiczbę(e: React.ChangeEvent<HTMLInputElement>) {
			const nowaLiczba = parseFloat(e.target.value)
			if (!isNaN(nowaLiczba)) {
				setX(nowaLiczba)
			}
		}

		return <div>
			{przed}
			<p>Typ: liczba</p>
			<p>
				<input type="text" value={x} onChange={zmieńLiczbę}/>
			</p>
			{po}
		</div>
	} else {
		const napis = x.napis || ''
		const gdziePrzecinek = x.gdziePrzecinek || 0

		function zmieńNapis(e: React.ChangeEvent<HTMLInputElement>) {
			const nowyNapis = e.target.value
			setX({ napis: nowyNapis, gdziePrzecinek })
		}

		function zmieńPrzecinek(e: React.ChangeEvent<HTMLInputElement>) {
			const nowyPrzecinek = parseInt(e.target.value)
			if (!isNaN(nowyPrzecinek)) {
				setX({ napis, gdziePrzecinek: nowyPrzecinek })
			}
		}

		return <div>
			{przed}
			<p>Typ: napis</p>
			<p>
				<input type="text" value={x.napis} onChange={zmieńNapis}/>
				<input type="number" value={x.gdziePrzecinek} onChange={zmieńPrzecinek}/>
			</p>
			{po}
		</div>
	}
}

export default DebugWyswietlacza
