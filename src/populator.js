import axios from "axios"
import fs from "fs"

const getAbilities = async () => {
    let abilities = []
    try {
        for (let i = 1; i <= 267; i++) {
            let response = await axios.get(`https://pokeapi.co/api/v2/ability/${i}`)
            abilities.push(response.data.name)
        }
    } catch (error) {
        return
    }
    let insertCommand = `INSERT INTO abilities (name) VALUES `
    abilities.map(ability => {
        if (abilities.indexOf(ability) % 10 === 0) {
            insertCommand += `('${ability}'),\n`
        } else {
            insertCommand += `('${ability}'),`
        }

    }).join(',')
    insertCommand = insertCommand.slice(0, -1)
    fs.writeFileSync('./src/sql/abilities.sql', insertCommand)
}

const getTypes = async () => {
    let types = []
    try {
        for (let i = 1; i <= 18; i++) {
            let response = await axios.get(`https://pokeapi.co/api/v2/type/${i}`)
            console.log(i);
            types.push(response.data.name)
        }
    } catch (error) {
        return
    }
    let insertCommand = `INSERT INTO types (name) VALUES `
    types.map(type => {
        if (types.indexOf(type) % 10 === 0) {
            insertCommand += `('${type}'),\n`
        } else {
            insertCommand += `('${type}'),`
        }
    }).join(',')    
    insertCommand = insertCommand.slice(0, -1)
    fs.writeFileSync('./src/sql/types.sql', insertCommand)
}

const getPokemons = async () => {
    let pokemons = []
    let pokemonQtd = 23
    try {
        for (let i = 1; i <= pokemonQtd; i++) {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            let pokemon = {
                name: response.data.species.name,
                height: response.data.height,
                weight: response.data.weight,
                // images: 
                // evololution_to: 
            }
            console.log(i);
            pokemons.push(pokemon)
        }
    } catch (error) {
        return
    }
    let insertCommand = `INSERT INTO pokemons (name, height, weight) VALUES `
    pokemons.map(pokemon => {
        if (pokemons.indexOf(pokemon) % 10 === 0) {
            insertCommand += `('${pokemon.name}', ${pokemon.height}, ${pokemon.weight}),\n`
        } else {
            insertCommand += `('${pokemon.name}', ${pokemon.height}, ${pokemon.weight}),`
        }

    }).join(',')
    insertCommand = insertCommand.slice(0, -1)
    fs.writeFileSync('./src/sql/pokemons.sql', insertCommand)
}


export default {
    getAbilities,
    getTypes,
    getPokemons
}