import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
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
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
);

Pokemon.hasOne(Stat, {
    as: 'stat',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idStat',
        allowNull: false,
        field: 'id_stat'
    }
});

Pokemon.hasOne(Pokemon, {
    as: 'evolution',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'evolutionTo',
        allowNull: true,
        field: 'evolution_to'
    }
});

export default Pokemon