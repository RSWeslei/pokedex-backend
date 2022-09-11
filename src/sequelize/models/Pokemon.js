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
        createdAt: false,
        updatedAt: false,
    },
);

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