import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";

const Type = sequelize.define(
    'types',
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
        icon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING(7),
            allowNull: false
        },
        weakness: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        resistance: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
export default Type