const AuthorModel = require("../../models/author");
const CatchWrapDb = require("../../wrappers/db");

const namespace = "Storage.Author";

const AuthorStorage = {
  Create: CatchWrapDb(`${namespace}.Create`, async (args) => {
    let author = new AuthorModel(args);

    const resp = await author.save();

    return resp;
  }),

  GetByID: CatchWrapDb(`${namespace}.GetByID`, async (args) => {
    if (!args.id) {
      throw new Error("id is required to get author");
    }

    let author = await AuthorModel.findOne({ _id: args.id });

    if (!author) {
      throw new Error("failed to find author with given id");
    }

    return author;
  }),

  GetList: CatchWrapDb(`${namespace}.GetList`, async (args) => {
    let query = {};

    if (args.search.trim()) {
      query = {
        ...query,
        name: { $regex: ".*" + args.search + ".*" },
      };
    }

    let options = {
      limit: args.limit,
      skip: args.offset,
    };

    return {
      authors: await AuthorModel.find(query, {}, options),
      count: await AuthorModel.countDocuments(query),
    };
  }),

  Update: CatchWrapDb(`${namespace}.Update`, async (args) => {
    if (!args.id) {
      throw new Error("id is required to update author");
    }

    let author = await AuthorModel.findOneAndUpdate(
      {
        //query
        _id: args.id,
      },
      {
        //update
        $set: {
          name: args.name,
          price: args.price,
        },
      },
      {
        //options
        upsert: false,
        new: true,
      }
    );

    if (!author) {
      throw new Error(`author with given id is not found!`);
    }

    return author;
  }),

  Delete: CatchWrapDb(`${namespace}.Delete`, async (args) => {
    if (!args.id) {
      throw new Error("id is required to delete author");
    }

    const author = await AuthorModel.findOneAndDelete({ _id: args.id });

    if (!author) {
      throw new Error(`author with the given id is not found!`);
    }

    return {};
  }),
};

module.exports = AuthorStorage;
