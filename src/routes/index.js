import pokemonsRoute from './pokemonsRoute'
import abilitiesRoute from './abilitiesRoute'

function Routes(app){
    abilitiesRoute(app)
    pokemonsRoute(app)
}

export default Routes