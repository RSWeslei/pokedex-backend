import { DataTypes } from "sequelize";
import { sequelize } from "../../config/config";
import Type from "./Type";

const TypeDamageRelation = sequelize.define(
    'type_damage_relations',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doubleDamageFrom: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        doubleDamageTo: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        halfDamageFrom: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        halfDamageTo: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        noDamageFrom: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        noDamageTo: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
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

// idType
TypeDamageRelation.belongsTo(Type, {
    foreignKey: 'idType',
    as: 'type'
})

export default TypeDamageRelation