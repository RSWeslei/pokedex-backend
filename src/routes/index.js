import pokemonsRoute from './pokemonsRoute'
import abilitiesRoute from './abilitiesRoute'
import typeDamageRelationsRoute from './typeDamageRelationsRoute'
import usersRoute from './usersRoute'

function Routes(app){
    abilitiesRoute(app)
    pokemonsRoute(app)
    typeDamageRelationsRoute(app)
    usersRoute(app)
}

export default Routes