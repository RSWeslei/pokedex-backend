import pokemonsRoute from './pokemonsRoute'
import abilitiesRoute from './abilitiesRoute'
import typeDamageRelationsRoute from './typeDamageRelationsRoute'

function Routes(app){
    abilitiesRoute(app)
    pokemonsRoute(app)
    typeDamageRelationsRoute(app)
}

export default Routes