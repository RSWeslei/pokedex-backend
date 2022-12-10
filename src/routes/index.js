import pokemonsRoute from './pokemonsRoute'
import abilitiesRoute from './abilitiesRoute'
import typeDamageRelationsRoute from './typeDamageRelationsRoute'
import usersRoute from './usersRoute'
import favoritesRoute from './favoritesRoute'

function Routes(app){
    abilitiesRoute(app)
    pokemonsRoute(app)
    typeDamageRelationsRoute(app)
    usersRoute(app)
    favoritesRoute(app)
}

export default Routes