import Cyfra from "./Cyfra"

function Wyświetlacz({ napis, przecinek, długość }: { napis: string, przecinek: number, długość: number}) {
    const cyfry = napis.padEnd(długość, ' ').slice(0, długość).split('')
    return <div className="wyswietlacz">
        {cyfry.map((cyfra, i) => <Cyfra key={i} cyfra={cyfra} kropka={i === przecinek} />)}
    </div>
}

export default Wyświetlacz
