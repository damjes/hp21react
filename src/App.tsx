import Cyfra from "./Cyfra"

import './App.sass'

function App() {
	return <>
		<div className="wyswietlacz">
			<Cyfra cyfra=' ' kropka={false} />
			<Cyfra cyfra='E' kropka={true} />
			<Cyfra cyfra='r' kropka={false} />
			<Cyfra cyfra='r' kropka={true} />
			<Cyfra cyfra='o' kropka={false} />
			<Cyfra cyfra='r' kropka={true} />
			<Cyfra cyfra=' ' kropka={false} />
			<Cyfra cyfra='7' kropka={true} />
			<Cyfra cyfra='8' kropka={false} />
			<Cyfra cyfra='9' kropka={true} />
			<Cyfra cyfra=' ' kropka={false} />
			<Cyfra cyfra='-' kropka={true} />
		</div>
	</>
}

export default App
