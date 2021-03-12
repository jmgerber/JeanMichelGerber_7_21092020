module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    }
  },
    {
      tableName: 'comments'
    }
  );

  Comment.associate = function (models) {
    models.Comment.belongsTo(models.User, {
      foreignKey: 'userId',
    })
  };

  return Comment;
}