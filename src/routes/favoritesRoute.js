import controller from "../controllers/favoritesController";
import tokenValidador from "../middlewares/tokenValidator";

export default (app) => {
    app.get("/favorites-by-user", tokenValidador.validateUser, controller.getByUser);
    app.post("/favorites/create", tokenValidador.validateUser, controller.create);
    app.delete("/favorites/remove/:idFavorite", tokenValidador.validateUser, controller.remove);
    app.post("/favorites/update", tokenValidador.validateUser, controller.update);
}