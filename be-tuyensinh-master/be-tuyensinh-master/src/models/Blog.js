'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Blog.belongsTo(models.Allcode, { foreignKey: 'type', targetKey: 'keyMap', as: 'typeData' });
        }
    }
    Blog.init(
        {
            thumbnail: DataTypes.STRING,
            title: DataTypes.STRING,
            file: DataTypes.TEXT('long'),
            contentHTML: DataTypes.TEXT('long'),
            contentMarkdown: DataTypes.TEXT('long'),
            slug: DataTypes.STRING,
            type: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Blog',
        },
    );
    return Blog;
};
