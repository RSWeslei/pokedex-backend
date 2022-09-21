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
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false
        },
        attack: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false
        },
        defense: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false
        },
        speed: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false
        },
        specialAttack: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },
        specialDefense: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },
        minHp: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },
        minAttack: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },
        minDefense: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },
        minSpeed: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },
        minSpecialAttack: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },
        minSpecialDefense: {
            type: DataTypes.NUMERIC(10, 0),
            allowNull: false,
            defaultValue: 0
        },

    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    },
);

export default Stat