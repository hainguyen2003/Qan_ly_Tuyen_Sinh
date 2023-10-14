'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Allcode.hasMany(models.UngTuyen, { foreignKey: 'keHoach', as: 'keHoachData' });
            Allcode.hasMany(models.UngTuyen, { foreignKey: 'status', as: 'statusData' });
            Allcode.hasMany(models.Blog, { foreignKey: 'type', as: 'typeData' });
        }
    }
    Allcode.init(
        {
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            title: DataTypes.STRING,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Allcode',
        },
    );
    return Allcode;
};
