// import Usuario from "./Usuario";
import Ability from "./Ability"
import Stat from "./Stat"
import Type from "./Type"
import Pokemon from "./Pokemon"
import PokemonAbility from "./PokemonAbility"
import PokemonType from "./PokemonType"
import EvolutionChain from "./EvolutionChain"
import populator from '../../populator'
import TypeDamageRelation from "./TypeDamageRelation"

let sync = true
async function start () {
	await Ability.sync({force: sync})
	await Type.sync({force: sync})
	await Stat.sync({force: sync})
	await Pokemon.sync({force: sync})
	await PokemonAbility.sync({force: sync})
	await PokemonType.sync({force: sync})
	await EvolutionChain.sync({force: sync})
	await TypeDamageRelation.sync({force: sync})

	await getApi()
}
async function getApi() {
	// await populator.getAbilities()
	// await populator.getEvolutionsChain()
	// await populator.getTypes()0
	// await populator.getPokemons()
	// await populator.getTypeDamageRelations()
	await populator.main()
}
start()