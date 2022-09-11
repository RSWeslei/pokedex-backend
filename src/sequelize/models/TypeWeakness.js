import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
import Type from "./Type";

const TypeWeakness = sequelize.define(
    'type_weakness',
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
        createdAt: false,
        updatedAt: false,
    }
);

TypeWeakness.belongsTo(Type, {
    as: 'type',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idType',
        allowNull: false,
        field: 'id_type'
    }
});

TypeWeakness.belongsTo(Type, {
    as: 'typeWeakness',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idTypeWeakness',
        allowNull: false,
        field: 'id_type_weakness'
    }
});

export default TypeWeakness