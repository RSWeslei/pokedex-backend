import controller from "../controllers/favoritesController";

export default (app) => {
    app.get("/favorites-by-user/:idUser", controller.getByUser);
    app.post("/favorites/create", controller.create);
    app.delete("/favorites/remove/:idFavorite", controller.remove);
    app.post("/favorites/update", controller.update);
}