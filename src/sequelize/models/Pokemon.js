import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
import EvolutionChain from "./EvolutionChain";
import Stat from "./Stat";

const Pokemon = sequelize.define(
    'pokemons',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        height: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false
        },
        weight: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false
        },
        images: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        generation: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    },
);

Pokemon.belongsTo(EvolutionChain, {
    as: 'evolution',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idEvolutionChain',
        allowNull: true,
        field: 'id_evolution_chain'
    },
});

Pokemon.belongsTo(Stat, {
    as: 'stat',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idStat',
        allowNull: false,
        field: 'id_stat'
    }
});
export default Pokemon