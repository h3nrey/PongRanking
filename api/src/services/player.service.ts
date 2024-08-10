async function listPlayers(page: number) {
    const players = ["Fan zhendong", "Ma Long", "Wang Chuqin"]
    console.log("list page" + page);

    return {
        players
    };
}

export {
    listPlayers,
}