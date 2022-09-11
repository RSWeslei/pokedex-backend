import { DataTypes } from "sequelize";
import { sequelize } from "./../../config/config";

const BaseModel = sequelize.define(
    'nome',
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
        createdAt: false,
        updatedAt: false,
    }
);

export default BaseModel