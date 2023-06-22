require("dotenv").config();

const mongoose = require("mongoose");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

const Config = require("./config/index");
const Logger = require("./config/logger");

const BookService = require("./services/book");
const AuthorService = require("./services/author");

// loading proto file
const PROTO_URL = __dirname + "/protos/blogpost_service/blogpost_service.proto";
const packageDefinition = protoLoader.loadSync(PROTO_URL, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const blogpostServiceProto =
  grpc.loadPackageDefinition(packageDefinition).blogpost_service;

function main() {
  Logger.debug("Main function is running");

  let mongoDBUrl = `mongodb://${Config.mongoUser}:${Config.mongoPassword}@${Config.mongoHost}:${Config.mongoPort}/${Config.mongoDatabase}`;
  if (Config.mongoHost == "localhost") {
    mongoDBUrl = `mongodb://${Config.mongoHost}:${Config.mongoPort}/${Config.mongoDatabase}`;
  }
  Logger.debug("Connecting to db: " + mongoDBUrl);

  mongoose.connect(
    mongoDBUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(
          `There is an error in connecting db "${mongoDBUrl}": ${err.message}`
        );
        Logger.error(
          `There is an error in connecting db "${mongoDBUrl}": ${err.message}`
        );
        process.exit(0);
      }
    }
  );

  mongoose.connection.once("open", async function () {
    Logger.info("Connected to the database");
  });

  var server = new grpc.Server();

  server.addService(blogpostServiceProto.BookService.service, BookService);
  server.addService(blogpostServiceProto.AuthorService.service, AuthorService);

  server.bindAsync(
    Config.serviceHost + Config.grpcPort,
    grpc.ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) {
        throw new Error("Error while binding grpc server to the port");
      }

      Logger.info(
        "gRPC server is running at %s",
        Config.serviceHost + Config.grpcPort
      );

      server.start();
    }
  );
}

main();
