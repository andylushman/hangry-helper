module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		email: { 
			type: DataTypes.STRING,
			
			allowNull: false,


			validate: {
				isEmail: true
			}
		},
		username: {
			type: DataTypes.STRING,
            allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}	
	});

	User.associate = function(models) {
		User.hasMany(models.FavRecipe);
	}

	return User; 
};