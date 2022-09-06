// import Usuario from "./Usuario";
import Ability from "./Ability"
import Stat from "./Stat"
import Type from "./Type"
import Pokemon from "./Pokemon"
import PokemonAbility from "./PokemonAbility"
import PokemonType from "./PokemonType"
import EvolutionChain from "./EvolutionChain"
import populator from '../../populator'

async function start () {
	await Ability.sync({force: false})
	await Type.sync({force: false})
	await Stat.sync({force: false})
	await Pokemon.sync({force: false})
	await PokemonAbility.sync({force: false})
	await PokemonType.sync({force: false})
	await EvolutionChain.sync({force: false})

	await getApi()
}
async function getApi() {
	// await populator.getAbilities()
	// await populator.getEvolutionsChain()
	// await populator.getTypes()
	// await populator.getPokemons()
	// await populator.main()
}
start()