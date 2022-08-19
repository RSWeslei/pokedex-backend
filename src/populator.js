import axios from "axios"
import fs from "fs"
import Ability from "./sequelize/models/Ability"
import Pokemon from "./sequelize/models/Pokemon"
import PokemonAbility from "./sequelize/models/PokemonAbility"
import PokemonType from "./sequelize/models/PokemonType"
import Stat from "./sequelize/models/Stat"
import Type from "./sequelize/models/Type"

const getAbilities = async () => {
    let abilities = []
    let abilitiesJson = []
    let totalAbilities = 267 // original 267
    try {
        for (let i = 1; i <= totalAbilities; i++) {
            let response = await axios.get(`https://pokeapi.co/api/v2/ability/${i}`)
            abilities.push(response.data.name)
            abilitiesJson.push({name: response.data.name})
            console.log(`Ability ${i}/${totalAbilities}`)
        }
        let insertCommand = `INSERT INTO abilities (name) VALUES\n`
        abilities.map(ability => {
            insertCommand += `('${ability}'),\n`
        }).join(',')
        insertCommand = insertCommand.slice(0, -1)
        fs.writeFileSync('./src/sql/abilities.sql', insertCommand)
        // save abilities in a json file
        fs.writeFileSync('./src/json/abilities.json', JSON.stringify(abilitiesJson))
    } catch (error) {
        return
    }
}

const getTypes = async () => {
    let types = []
    let typesJson = []
    let totalTypes = 18 // original 18
    try {
        for (let i = 1; i <= totalTypes; i++) {
            let response = await axios.get(`https://pokeapi.co/api/v2/type/${i}`)
            types.push({name: response.data.name})
            typesJson.push({name: response.data.name})
            console.log(`Type ${i}/${totalTypes}`)
        }
        let insertCommand = `INSERT INTO types (name) VALUES\n`
        types.map(type => {
            insertCommand += `('${type}'),\n`
        }).join(',')    
        insertCommand = insertCommand.slice(0, -1)
        fs.writeFileSync('./src/sql/types.sql', insertCommand)
        // save types in a json file
        fs.writeFileSync('./src/json/types.json', JSON.stringify(typesJson))
    } catch (error) {
        console.log(error);
        return
    }
}

let stats = []
const getStat = async (pokemon) => {
    try {
        let stat = {
            hp: pokemon[0].base_stat,
            attack: pokemon[1].base_stat,
            defense: pokemon[2].base_stat,
            speed: pokemon[5].base_stat,
            specialAttack: pokemon[3].base_stat,
            specialDefense: pokemon[4].base_stat
        }
        stats.push(stat)
    } catch (error) {
        console.log(error);
        return
    }
}

const getPokemons = async () => {
    let pokemons = []
    let abilities = []
    let types = []
    let pokemonQtd = 905 // original 905
    try {
        for (let i = 1; i <= pokemonQtd; i++) {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            let images = await getImages(response)
            await getStat(response.data.stats)
            let pokemon = {
                name: response.data.species.name,
                height: response.data.height,
                weight: response.data.weight,
                images: images,
                idStat: stats.length
            }
            let abilitiesId = response.data.abilities.map(ability => {
                return ability.ability.url.split('/')[6]
            })
            let typesId = response.data.types.map(type => {
                return type.type.url.split('/')[6]
            })
            abilities.push(abilitiesId)
            types.push(typesId)
            pokemons.push(pokemon)
            console.log(`Pokemon ${i}/${pokemonQtd}`)
        }

        let insertPokemonAbility = `INSERT INTO pokemon_abilities (id_pokemon, id_ability) VALUES\n`
        abilities.map(ability => {
            ability.map(id => {
                insertPokemonAbility += `(${abilities.indexOf(ability) + 1}, ${id}),\n`
            }).join(',')
        }).join(',')
        insertPokemonAbility = insertPokemonAbility.slice(0, -1)
        fs.writeFileSync('./src/sql/pokemon_abilities.sql', insertPokemonAbility)

        // save pokemon_abilities in a json file
        let pokemonAbilitiesJson = []
        abilities.map(ability => {
            ability.map(id => {
                pokemonAbilitiesJson.push({id_pokemon: abilities.indexOf(ability) + 1, id_ability: id})
            }).join(',')
        }).join(',')
        fs.writeFileSync('./src/json/pokemon_abilities.json', JSON.stringify(pokemonAbilitiesJson)) 

        let insertPokemonType = `INSERT INTO pokemon_types (id_pokemon, id_type) VALUES\n`
        types.map(type => {
            type.map(id => {
                insertPokemonType += `(${types.indexOf(type) + 1}, ${id}),\n`
            }).join(',')
        }).join(',')
        insertPokemonType = insertPokemonType.slice(0, -1)
        fs.writeFileSync('./src/sql/pokemon_types.sql', insertPokemonType)

        // save pokemon_types in a json file
        let pokemonTypesJson = []
        types.map(type => {
            type.map(id => {
                pokemonTypesJson.push({id_pokemon: types.indexOf(type) + 1, id_type: id})
            }).join(',')
        }).join(',')
        fs.writeFileSync('./src/json/pokemon_types.json', JSON.stringify(pokemonTypesJson))
        
        let insertStats = `INSERT INTO stats (hp, attack, defense, speed, specialAttack, specialDefense) VALUES\n`
        stats.map(stat => {
            insertStats += `(${stat.hp}, ${stat.attack}, ${stat.defense}, ${stat.speed}, ${stat.specialAttack}, ${stat.specialDefense}),\n`
        }).join(',')
        insertStats = insertStats.slice(0, -1)
        fs.writeFileSync('./src/sql/stats.sql', insertStats)

        // save stats in a json file
        fs.writeFileSync('./src/json/stats.json', JSON.stringify(stats))

        let insertCommand = `INSERT INTO pokemons (name, height, weight, images, id_stat) VALUES\n`
        pokemons.map(pokemon => {
            insertCommand += `('${pokemon.name}', ${pokemon.height}, ${pokemon.weight}), ${JSON.stringify(pokemon.images)}, ${pokemon.idStat}\n`
        }).join(',')
        insertCommand = insertCommand.slice(0, -1)
        fs.writeFileSync('./src/sql/pokemons.sql', insertCommand)

        // save pokemons in a json file
        fs.writeFileSync('./src/json/pokemons.json', JSON.stringify(pokemons))

        console.log('Pokemons populados com sucesso!')
        console.log('Total de pokemons: ' + pokemons.length)
        console.log('Total de abilities: ' + abilities.length)
        console.log('Total de types: ' + types.length)
        console.log('Total de stats: ' + stats.length)
    } catch (error) {
        console.log(error);
        return
    }
}

const updateEvolutions = async () => {
    try {
        let evolutionSize = 209 // original 209
        let evolutions = []
        for (let i = 1; i < evolutionSize; i++) {        
            let response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
            let pokemonId = response.data.chain.species.url.split('/')[6]
            let evolutionTo = null
            if (response.data.chain.evolves_to[0]){
                evolutionTo = response.data.chain.evolves_to[0].species.url.split('/')[6]
            }
            let evolution = {
                idPokemon: pokemonId,
                idEvolution: evolutionTo
            }
            evolutions.push(evolution)
            console.log(`Evolution ${i}/${evolutionSize}`)
        }
        let updateCommand = `UPDATE pokemons SET id_evolution = `
        evolutions.map(evolution => {
            updateCommand += `${evolution.idEvolution} WHERE id = ${evolution.idPokemon},\n`
        }).join(',')
        updateCommand = updateCommand.slice(0, -1)
        fs.writeFileSync('./src/sql/update_evolutions.sql', updateCommand)

        // save evolutions in a json file
        fs.writeFileSync('./src/json/evolutions.json', JSON.stringify(evolutions))
        console.log('Evoluções atualizadas com sucesso!')
        console.log('Total de evoluções: ' + evolutions.length)
    } catch (error) {
        console.log(error);
        return
    }    
}


const getImages = async (response) => {
    try {
        let images = {}
        let artwork = response.data.sprites.other['official-artwork'].front_default
        let home = response.data.sprites.other.home
        let svgs = response.data.sprites.other.dream_world
        let animated = response.data.sprites.versions['generation-v']['black-white'].animated
        images = {
            artwork: artwork,
            home: home,
            svgs: svgs,
            animated: animated
        }
        return images
    } catch (error) {
        console.log(error);
        return
    }
}

async function main() {
    // get json file abilities ./json/abilities.json
    let abilities = JSON.parse(fs.readFileSync('./src/json/abilities.json'))
    for (let i = 0; i < abilities.length; i++) {
        let response = await Ability.create(abilities[i])
    }
    // get json file types ./json/types.json
    let types = JSON.parse(fs.readFileSync('./src/json/types.json'))
    for (let i = 0; i < types.length; i++) {
        let response = await Type.create(types[i])
    }
    // get json file stats ./json/stats.json
    let stats = JSON.parse(fs.readFileSync('./src/json/stats.json'))
    for (let i = 0; i < stats.length; i++) {
        let response = await Stat.create(stats[i])
    }
    // get json file pokemon_types ./json/pokemon_types.json
    let pokemonTypes = JSON.parse(fs.readFileSync('./src/json/pokemon_types.json'))
    for (let i = 0; i < pokemonTypes.length; i++) {
        let response = await PokemonType.create(pokemonTypes[i])
    }
    // get json file pokemon_abilities ./json/pokemon_abilities.json
    let pokemonAbilities = JSON.parse(fs.readFileSync('./src/json/pokemon_abilities.json'))
    for (let i = 0; i < pokemonAbilities.length; i++) {
        let response = await PokemonAbility.create(pokemonAbilities[i])
    }
    // get json file pokemons ./json/pokemons.json
    let pokemons = JSON.parse(fs.readFileSync('./src/json/pokemons.json'))
    for (let i = 0; i < pokemons.length; i++) {
        let response = await Pokemon.create(pokemons[i])
    }
    
}
export default {
    getAbilities,
    getTypes,
    getPokemons,
    updateEvolutions,
    main
}
