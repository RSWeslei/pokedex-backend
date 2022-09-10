import axios from "axios"
import fs from "fs"
import Ability from "./sequelize/models/Ability"
import EvolutionChain from "./sequelize/models/EvolutionChain"
import Pokemon from "./sequelize/models/Pokemon"
import PokemonAbility from "./sequelize/models/PokemonAbility"
import PokemonType from "./sequelize/models/PokemonType"
import Stat from "./sequelize/models/Stat"
import Type from "./sequelize/models/Type"
import TypeResistance from "./sequelize/models/TypeResistance"
import TypeWeakness from "./sequelize/models/TypeWeakness"

const getAbilities = async () => {
    let abilities = []
    let totalAbilities = 268 // original 268
    try {
        for (let i = 1; i <= totalAbilities; i++) {
            let response = null
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/ability/${i}`)
            } catch (error) {
                console.log(error.message);
                continue
            }
            let effect = ''
            if (response.data.effect_entries[0] && (response.data.effect_entries[0].language.name == 'en')) {
                effect = response.data.effect_entries[0].effect
            }
            else if (response.data.effect_entries[1] && (response.data.effect_entries[1].language.name == 'en')) {
                effect = response.data.effect_entries[1].effect
            }
            let ability = {
                id: response.data.id,
                name: response.data.name,
                description: effect
            }
            abilities.push(ability)
            console.log(`Ability ${i}/${totalAbilities}`)
        }
        // save abilities in a json file
        fs.writeFileSync('./src/json/abilities.json', JSON.stringify(abilities))
    } catch (error) {
        console.log(error);
        return
    }
}

const getTypes = async () => {
    let types = []
    let totalTypes = 20 // original 20
    let TypeWeakness = []
    let TypeResistance = []
    const colours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };
    try {
        for (let i = 1; i <= totalTypes; i++) {
            let response = null
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/type/${i}`)
            } catch (error) {
                continue
            }
            response.data.damage_relations.double_damage_from.forEach(type => {
                TypeWeakness.push(
                    {
                        idType: response.data.id,
                        idTypeWeakness: type.url.split('/')[6]
                    }
                )
            })
            response.data.damage_relations.double_damage_to.forEach(type => {
                TypeResistance.push(
                    {
                        idType: response.data.id,
                        idTypeResistance: type.url.split('/')[6]
                    }
                )
            })
            types.push({
                id: response.data.id,
                name: response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1),
                color: colours[response.data.name]
            })
            console.log(`Type ${i}/${totalTypes}`)

        }
        // save types in a json file
        fs.writeFileSync('./src/json/types.json', JSON.stringify(types))
        // save type_weakness in a json file
        fs.writeFileSync('./src/json/type_weakness.json', JSON.stringify(TypeWeakness))
        // save type_resistance in a json file
        fs.writeFileSync('./src/json/type_resistance.json', JSON.stringify(TypeResistance))
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

const getEvolutionsChain = async () => {
    try {
        let evolutionSize = 468 // original 468
        let evolutions = []
        for (let i = 1; i <= evolutionSize; i++) {
            
            // make the response dont break the code
            let response = null
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${i}`)
            } catch (error) {
                continue
            }
            let actualExist = response.data.chain.evolves_to.length > 0
            let nextExist = actualExist ? response.data.chain.evolves_to[0].evolves_to.length > 0 : false
            let evolutionChain = {
                id: response.data.id,
                previousEvolution: response.data.chain.species.url.split('/')[6],
                actualEvolution: actualExist ? response.data.chain.evolves_to[0].species.url.split('/')[6] : null,
                nextEvolution: nextExist ? response.data.chain.evolves_to[0].evolves_to[0].species.url.split('/')[6] : null
            }
            evolutions.push(evolutionChain)
            console.log(`Evolution ${i}/${evolutionSize}`)
        }
        fs.writeFileSync('./src/json/evolutions_chain.json', JSON.stringify(evolutions))
        console.log('Evolu��es da �rvore atualizadas com sucesso!')
        return evolutions
    } catch (error) {
        console.log(error);
        return
    }
}

const getPokemons = async () => {
    let pokemons = []
    let abilities = []
    let types = []
    let pokemonQtd = 906 // original 906
    try {
        for (let i = 1; i <= pokemonQtd; i++) {
            let response = null
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
            } catch (error) {
                continue
            }
            
            let images = await getImages(response)
            await getStat(response.data.stats)
            let name = response.data.species.name
            let nameFixed = name.charAt(0).toUpperCase() + name.slice(1)
            let pokemon = {
                id: response.data.id,
                name: nameFixed,
                height: response.data.height,
                weight: response.data.weight,
                images: images,
                idStat: stats.length
            }
            let abilitiesData = response.data.abilities.map(ability => {
                return {
                    abilityId: ability.ability.url.split('/')[6],
                    isHidden: ability.is_hidden
                }
            })
            let typesId = response.data.types.map(type => {
                return type.type.url.split('/')[6]
            })
            abilities.push(abilitiesData)
            types.push(typesId)
            pokemons.push(pokemon)
            console.log(`Pokemon ${i}/${pokemonQtd}`)
        }
        console.log(abilities);
        //#region Insert Pokemon

        // save pokemon_abilities in a json file
        let pokemonAbilitiesJson = []
        abilities.map(ability => {
            ability.map(abilityData => {
                pokemonAbilitiesJson.push({
                    idPokemon: abilities.indexOf(ability) + 1,
                    idAbility: abilityData.abilityId,
                    isHidden: abilityData.isHidden
                })
            }).join(',')
        }).join(',')
        fs.writeFileSync('./src/json/pokemon_abilities.json', JSON.stringify(pokemonAbilitiesJson)) 

        // save pokemon_types in a json file
        let pokemonTypesJson = []
        types.map(type => {
            type.map(id => {
                pokemonTypesJson.push({idPokemon: types.indexOf(type) + 1, idType: id})
            }).join(',')
        }).join(',')
        fs.writeFileSync('./src/json/pokemon_types.json', JSON.stringify(pokemonTypesJson))

        // save stats in a json file
        fs.writeFileSync('./src/json/stats.json', JSON.stringify(stats))

        // save pokemons in a json file
        fs.writeFileSync('./src/json/pokemons.json', JSON.stringify(pokemons))

        console.log('Pokemons populados com sucesso!')
        console.log('Total de pokemons: ' + pokemons.length)
        console.log('Total de abilities: ' + abilities.length)
        console.log('Total de types: ' + types.length)
        console.log('Total de stats: ' + stats.length)

        //#endregion
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
    try {
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
        // get json file type_weaknesses ./json/type_weaknesses.json
        let typeWeaknesses = JSON.parse(fs.readFileSync('./src/json/type_weakness.json'))
        for (let i = 0; i < typeWeaknesses.length; i++) {
            let response = await TypeWeakness.create(typeWeaknesses[i])
        }
        // get json file type_resistances ./json/type_resistances.json
        let typeResistances = JSON.parse(fs.readFileSync('./src/json/type_resistance.json'))
        for (let i = 0; i < typeResistances.length; i++) {
            let response = await TypeResistance.create(typeResistances[i])
        }
        // get json file stats ./json/stats.json
        let stats = JSON.parse(fs.readFileSync('./src/json/stats.json'))
        for (let i = 0; i < stats.length; i++) {
            let response = await Stat.create(stats[i])
        }
        // get json file pokemons ./json/pokemons.json
        let pokemons = JSON.parse(fs.readFileSync('./src/json/pokemons.json'))
        for (let i = 0; i < pokemons.length; i++) {
            // fix name
            let name = pokemons[i].name
            let nameFixed = name.charAt(0).toUpperCase() + name.slice(1)
            pokemons[i].name = nameFixed
            let response = await Pokemon.create(pokemons[i])
        }
        // get json file pokemon_abilities ./json/pokemon_abilities.json
        let pokemonAbilities = JSON.parse(fs.readFileSync('./src/json/pokemon_abilities.json'))
        for (let i = 0; i < pokemonAbilities.length; i++) {
            let response = await PokemonAbility.create(pokemonAbilities[i])
        }
        // get json file pokemon_types ./json/pokemon_types.json
        let pokemonTypes = JSON.parse(fs.readFileSync('./src/json/pokemon_types.json'))
        for (let i = 0; i < pokemonTypes.length; i++) {
            let response = await PokemonType.create(pokemonTypes[i])
        }
        // get json evolution_chain ./json/evolution_chain.json
        let evolutionChain = JSON.parse(fs.readFileSync('./src/json/evolutions_chain.json'))
        for (let i = 0; i < evolutionChain.length; i++) {
            let response = await EvolutionChain.create(evolutionChain[i])
        }
    } catch (error) {
        console.log(error);
        return
    }
}
export default {
    getAbilities,
    getTypes,
    getPokemons,
    getEvolutionsChain,
    main
}
