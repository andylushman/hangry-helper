module.exports = function(sequelize, DataTypes) {
  var FavRecipe = sequelize.define("FavRecipe", {
    title:  {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a favrecipe from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our favrecipe is between 1 and 140 characters
      validate: {
        len: [1]
      }
    },
    image:  DataTypes.STRING,
    source:  DataTypes.STRING,
    url:  DataTypes.STRING,
    yield: DataTypes.INTEGER,
    ingredients: DataTypes.TEXT,
    dietLabels: DataTypes.STRING,
    healthLabels: DataTypes.STRING,
    notes: DataTypes.TEXT,
    directions: DataTypes.TEXT,
    favorite: {
      type: DataTypes.BOOLEAN,
      // defaultValue is a flag that defaults a new favrecipe complete value to true if
      defaultValue: true
    },
}, {
  timestamps: true,
  });

  FavRecipe.associate = function(models) {
    FavRecipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return FavRecipe;
};
