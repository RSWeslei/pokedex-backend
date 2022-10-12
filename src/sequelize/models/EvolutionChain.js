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
        firstEvolution: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        secondEvolution: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        thirdEvolution: {
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