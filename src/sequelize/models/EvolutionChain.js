import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";

const EvolutionChain = sequelize.define(
    'evolutions_chain',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        previousEvolution: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        actualEvolution: {
            type: DataTypes.INTEGER,
            allowNull: true   
        },
        nextEvolution: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
);

export default EvolutionChain