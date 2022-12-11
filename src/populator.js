import axios from "axios"
import fs from "fs"
import Ability from "./sequelize/models/Ability"
import EvolutionChain from "./sequelize/models/EvolutionChain"
import Pokemon from "./sequelize/models/Pokemon"
import PokemonAbility from "./sequelize/models/PokemonAbility"
import PokemonType from "./sequelize/models/PokemonType"
import Stat from "./sequelize/models/Stat"
import Type from "./sequelize/models/Type"
import TypeDamageRelation from "./sequelize/models/TypeDamageRelation"

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

const getTypeDamageRelations = async () => {
    let damageRelation = []
    let totalTypes = 20
    try {
        for (let i = 1; i <= totalTypes; i++) {
            let response = null
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/type/${i}`)
            } catch (error) {
                continue
            }
            damageRelation.push(
               {
                idType: response.data.id,
                doubleDamageFrom: [],
                doubleDamageTo: [],
                halfDamageFrom: [],
                halfDamageTo: [],
                noDamageFrom: [],
                noDamageTo: []
               }
            )
            response.data.damage_relations.double_damage_from.forEach(type => {
                damageRelation[i-1].doubleDamageFrom.push(type.url.split('/')[6])
            })
            response.data.damage_relations.double_damage_to.forEach(type => {
                damageRelation[i-1].doubleDamageTo.push(type.url.split('/')[6])
            })
            response.data.damage_relations.half_damage_from.forEach(type => {
                damageRelation[i-1].halfDamageFrom.push(type.url.split('/')[6])
            })
            response.data.damage_relations.half_damage_to.forEach(type => {
                damageRelation[i-1].halfDamageTo.push(type.url.split('/')[6])
            })
            response.data.damage_relations.no_damage_from.forEach(type => {
                damageRelation[i-1].noDamageFrom.push(type.url.split('/')[6])
            })
            response.data.damage_relations.no_damage_to.forEach(type => {
                damageRelation[i-1].noDamageTo.push(type.url.split('/')[6])
            })
            console.log(`Type ${i}/${totalTypes}`)
        }
        // save damageRelation in a json file
        fs.writeFileSync('./src/json/damage_relation.json', JSON.stringify(damageRelation))
    } catch (error) {
        console.log(error);
        return
    }
}

let stats = []
const getStat = async (pokemon, generation) => {
    try {
        let stat = {
            hp: pokemon[0].base_stat,
            attack: pokemon[1].base_stat,
            defense: pokemon[2].base_stat,
            speed: pokemon[5].base_stat,
            specialAttack: pokemon[3].base_stat,
            specialDefense: pokemon[4].base_stat,
            minHp: getMinStat(pokemon[0].base_stat, 'hp', generation),
            minAttack: getMinStat(pokemon[1].base_stat, 'attack', generation),
            minDefense: getMinStat(pokemon[2].base_stat, 'defense', generation),
            minSpeed: getMinStat(pokemon[5].base_stat, 'speed', generation),
            minSpecialAttack: getMinStat(pokemon[3].base_stat, 'specialAttack', generation),
            minSpecialDefense: getMinStat(pokemon[4].base_stat, 'specialDefense', generation),
        }
        
        
        stats.push(stat)
    } catch (error) {
        console.log(error);
        return
    }
}

const getMinStat = (base, name, generation) => {
    let dv = 0
    let ev = 0 
    let level = 100
    let nature = 0.9

    if (generation == 1 || generation == 2) {
        if (name == 'hp') {
            return Math.floor(((base + dv) * 2 + Math.floor(Math.ceil(Math.sqrt(ev)) / 4)) * level / 100) + level + 10
        } else {
            return Math.floor(((base + dv) * 2 + Math.floor(Math.ceil(Math.sqrt(ev)) / 4)) * level / 100) + 5
        }
    }
    else if (generation >= 3) {
        if (name == 'hp') {
            return Math.floor(((2 * base + dv + Math.floor(ev / 4)) * level) / 100) + level + 10
        }
        else {
            return Math.floor((Math.floor(((2 * base + dv + Math.floor(ev / 4)) * level) / 100) + 5) * nature)
        }
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
            let firstExist = response.data.chain.evolves_to.length > 0
            let thirdExist = firstExist ? response.data.chain.evolves_to[0].evolves_to.length > 0 : false
            let firstDetailsExist = firstExist ? response.data.chain.evolves_to[0].evolution_details.length > 0 : false
            let thirdDetailsExist = thirdExist ? response.data.chain.evolves_to[0].evolves_to[0].evolution_details.length > 0 : false
            
            let evolutionChain = {
                id: response.data.id,
                firstEvolutionLevel: firstExist && firstDetailsExist ? response.data.chain.evolves_to[0].evolution_details[0].min_level : null,
                secondEvolutionLevel: thirdExist && thirdDetailsExist ? response.data.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level : null,
                firstEvolution: response.data.chain.species.url.split('/')[6],
                secondEvolution: firstExist ? response.data.chain.evolves_to[0].species.url.split('/')[6] : null,
                thirdEvolution: thirdExist ? response.data.chain.evolves_to[0].evolves_to[0].species.url.split('/')[6] : null
            }
            evolutions.push(evolutionChain)
            console.log(`Evolution ${i}/${evolutionSize}`)
        }
        fs.writeFileSync('./src/json/evolutions_chain.json', JSON.stringify(evolutions))
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
            let responseSpecies = null
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                responseSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
            } catch (error) {
                continue
            }
            
            let images = await getImages(response)
            let generation = responseSpecies.data.generation.name.split('-')[1]
            generation = generation == 'i' ? 1 : generation == 'ii' ? 2 : 
            generation == 'iii' ? 3 : generation == 'iv' ? 4 : 
            generation == 'v' ? 5 : generation == 'vi' ? 6 : 
            generation == 'vii' ? 7 : generation == 'viii' ? 8 : 0

            await getStat(response.data.stats, generation)
            let name = response.data.species.name
            let nameFixed = name.charAt(0).toUpperCase() + name.slice(1)
            let idEvolutionChain = responseSpecies.data.evolution_chain ? responseSpecies.data.evolution_chain.url.split('/')[6] : null

            let texts = responseSpecies.data.flavor_text_entries
            let description = ''
            try {
                description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'soulsilver')))
                if (description === undefined) {
                    description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'black')))
                }
                if (description === undefined) {
                    description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'x')))
                }
                if (description === undefined) {
                    description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'sun')))
                }
                if (description === undefined) {
                    description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'ultra-sun')))
                }
                if (description === undefined) {
                    description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'lets-go-pikachu')))
                }
                if (description === undefined) {
                    description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'sword')))
                }
                if (description === undefined) {
                    description = texts.find(text => (text.language.name === 'en' && (text.version.name === 'legends-arceus')))
                }
                description = description.flavor_text
            } catch (error) {
                continue
            }

            let pokemon = {
                id: response.data.id,
                name: nameFixed,
                height: response.data.height / 10,
                weight: response.data.weight / 10,
                images: images,
                description: description,
                idStat: stats.length,
                generation: generation,
                evolutionChain: idEvolutionChain
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
            // home: home,
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
        // get json file damage_relation ./json/damage_relation.json
        let damageRelation = JSON.parse(fs.readFileSync('./src/json/damage_relation.json'))
        for (let i = 0; i < damageRelation.length; i++) {
            let response = await TypeDamageRelation.create(damageRelation[i])
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
    getTypeDamageRelations,
    main
}
