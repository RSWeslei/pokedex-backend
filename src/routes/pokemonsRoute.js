import controller from '../controllers/pokemonsController'

export default (app) => {
    app.get('/pokemons', controller.get)
}

