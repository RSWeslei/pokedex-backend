import DataTypes from "sequelize";
import { sequelize } from "../../config/config";

const Ability = sequelize.define(
    'abilities',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(2000),
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

export default Ability