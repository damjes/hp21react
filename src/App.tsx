import Wyświetlacz from "./Wyswietlacz"

import './App.sass'

function App() {
	return <>
		<Wyświetlacz napis="123456789012" przecinek={3} />
		<Wyświetlacz napis=" Error -" przecinek={-1} />
	</>
}

export default App
