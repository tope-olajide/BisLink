import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from './../config/config';

const env = process.env.NODE_ENV || 'test';
const basename = path.basename(module.filename);
const config = configs[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    const fileName = (file.indexOf('.') !== 0) &&
                      (file !== basename) &&
                      (file.slice(-3) === '.js');
    return fileName;
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
