import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";

const Stat = sequelize.define(
    'stats',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hp: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false
        },
        attack: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false
        },
        defense: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false
        },
        speed: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false
        },
        specialAttack: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false,
            defaultValue: 0
        },
        specialDefense: {
            type: DataTypes.NUMERIC(10, 4),
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default Stat