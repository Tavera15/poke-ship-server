const pokemon = require('pokemontcgsdk');

pokemon.configure({apiKey: process.env.POKEMON_KEY});

const GetPokemon = async (req, res) =>
{
    try
    {
        const items = [];
        //const deck = await pokemon.card.where({ pageSize: 12, page: 24 })
        
        const deck = await pokemon.card.where({ limit: 12, offset: 25 })

        res.status(200).json(deck);
    }
    catch(err)
    {
        res.status(400).json(err);
    }
}


module.exports = {
    GetPokemon
}