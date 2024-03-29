import Cyfra from "./Cyfra"

import './App.sass'

function App() {
	return <>
		<div className="wyswietlacz">
			<Cyfra cyfra='0' kropka={false} />
			<Cyfra cyfra='1' kropka={true} />
			<Cyfra cyfra='2' kropka={false} />
			<Cyfra cyfra='3' kropka={true} />
			<Cyfra cyfra='4' kropka={false} />
			<Cyfra cyfra='5' kropka={true} />
			<Cyfra cyfra='6' kropka={false} />
			<Cyfra cyfra='7' kropka={true} />
			<Cyfra cyfra='8' kropka={false} />
			<Cyfra cyfra='9' kropka={true} />
			<Cyfra cyfra=' ' kropka={false} />
			<Cyfra cyfra='-' kropka={true} />
		</div>
	</>
}

export default App
