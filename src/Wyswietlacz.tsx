import Cyfra from "./Cyfra"

const długość = 12

function Wyświetlacz({ napis, przecinek }: { napis: string, przecinek: number }) {
    const cyfry = napis.padEnd(długość, ' ').slice(0, długość).split('')
    return <div className="wyswietlacz">
        {cyfry.map((cyfra, i) => <Cyfra key={i} cyfra={cyfra} kropka={i === przecinek} />)}
    </div>
}

export default Wyświetlacz
