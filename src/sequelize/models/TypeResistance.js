import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
import Type from "./Type";

const TypeResistance = sequelize.define(
    'type_resistance',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_type'
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

TypeResistance.belongsTo(Type, {
    as: 'type',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idType',
        allowNull: false,
        field: 'id_type'
    }
});

TypeResistance.belongsTo(Type, {
    as: 'TypeResistance',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idTypeResistance',
        allowNull: false,
        field: 'id_type_resistance'
    }
});

export default TypeResistance