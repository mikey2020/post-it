module.exports = (sequelize, DataTypes) => {
  const ReadMessages = sequelize.define('ReadMessages', {
    messageId: {
      type: DataTypes.INTEGER,
      unique: false
    },
    userId: DataTypes.INTEGER
  });
  return ReadMessages;
};
