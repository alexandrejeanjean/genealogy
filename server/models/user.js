var bcrypt = require('bcrypt-nodejs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  })
  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      )
    }
  })
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }
  User.associate = (models) => {
    User.hasMany(models.Family, {
      foreignKey: 'userId',
      as: 'families',
    })
  }
  return User
}
