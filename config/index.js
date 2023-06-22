const Config = {
  serviceName: getOrReturnDefaultValue("SERVICE_NAME", "task"),
  environment: getOrReturnDefaultValue("ENVIRONMENT", "debug"), // debug, test, release
  version: getOrReturnDefaultValue("VERSION", "1.0"),

  serviceHost: getOrReturnDefaultValue("SERVICE_HOST", "localhost"),
  grpcPort: getOrReturnDefaultValue("GRPC_PORT", ":9102"),

  mongoHost: getOrReturnDefaultValue("MONGO_HOST", "localhost"),
  mongoPort: getOrReturnDefaultValue("MONGO_PORT", "27017"),
  mongoUser: getOrReturnDefaultValue("MONGO_USER", "abdurahmon"),
  mongoPassword: getOrReturnDefaultValue("MONGO_PASSWORD", "aus1003"),
  mongoDatabase: getOrReturnDefaultValue("MONGO_DATABASE", "task"),
};

function getOrReturnDefaultValue(name, def = "") {
  if (process.env[name]) {
    return process.env[name];
  }
  return def;
}

module.exports = Config;
