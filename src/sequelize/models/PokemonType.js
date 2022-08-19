import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
import Pokemon from "./Pokemon";
import Type from "./Type";

const PokemonType = sequelize.define(
    'pokemon_types',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Pokemon.belongsToMany(Type, {
    through: PokemonType,
    as: 'types',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPokemon',
        allowNull: false,
        field: 'id_pokemon'
    }
});

Type.belongsToMany(Pokemon, {
    through: PokemonType,
    as: 'pokemons',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idType',
        allowNull: false,
        field: 'id_type'
    }
});

export default PokemonType