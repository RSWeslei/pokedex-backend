import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
import Ability from "./Ability";
import Pokemon from "./Pokemon";

const PokemonAbility = sequelize.define(
    'pokemon_abilities',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        isHidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'is_hidden'
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Pokemon.belongsToMany(Ability, {
    through: PokemonAbility,
    as: 'abilities',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPokemon',
        allowNull: false,
        field: 'id_pokemon'
    }
});

Ability.belongsToMany(Pokemon, {
    through: PokemonAbility,
    as: 'pokemons',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idAbility',
        allowNull: false,
        field: 'id_ability'
    }
});

export default PokemonAbility