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
	await Ability.sync({force: true})
	await Type.sync({force: true})
	await Stat.sync({force: true})
	await Pokemon.sync({force: true})
	await PokemonAbility.sync({force: true})
	await PokemonType.sync({force: true})
	await EvolutionChain.sync({force: true})

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