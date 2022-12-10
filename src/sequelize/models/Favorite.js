import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
import Pokemon from "./Pokemon";
import User from "./User";

const Favorite = sequelize.define(
    'favorites',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPokemon: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
);

User.hasMany(Favorite, {
    foreignKey: {
        name: 'idUser',
        allowNull: false,
        field: 'id_user'
    }
});

Favorite.belongsTo(User, {
    foreignKey: {
        name: 'idUser',
        allowNull: false,
        field: 'id_user'
    }
});

Pokemon.hasMany(Favorite, {
    foreignKey: {
        name: 'idPokemon',
        allowNull: false,
        field: 'id_pokemon'
    }
});

Favorite.belongsTo(Pokemon, {
    foreignKey: {
        name: 'idPokemon',
        allowNull: false,
        field: 'id_pokemon'
    }
});


export default Favorite