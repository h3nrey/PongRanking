export default async function getPlayerRank(){
    const baseURL = "http://localhost:8000/"
    const res = await fetch(`${baseURL}players?page=0&totalRows=10&sort=rating&order=desc`)
    const data = await res.json();
    const players = data.map((player: any) => {
        return {
            name: player.name,
            id: player.id,
            rating: player.Rating[0].score
        }
    })

    console.log(players);
    
    return players
}