module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[A-Z\-]{2,}/gi
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[A-Z\-]{2,}/gi
      }
    },
    avatar_url: {
      type: DataTypes.STRING,
      defaultValue: 'images/default_picture.png',
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    }
  },
    {
      timestamps: false,
      tableName: 'users'
    }
  );
  return User;
}