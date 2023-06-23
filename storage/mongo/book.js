const BookModel = require("../../models/book");
const AuthorModel = require("../../models/author");
const CatchWrapDb = require("../../wrappers/db");

const namespace = "Storage.Book";

const BookStorage = {
  Create: CatchWrapDb(`${namespace}.Create`, async (args) => {
    let book = new BookModel(args);

    const resp = await book.save();

    return resp;
  }),

  GetByID: CatchWrapDb(`${namespace}.GetByID`, async (args) => {
    if (!args.id) {
      throw new Error("id is required to get a book");
    }

    const book = await BookModel.findOne({ _id: args.id });
    const author = await AuthorModel.findOne({ _id: book.author_id });

    if (!book) {
      throw new Error("Failed to find a book with the given id");
    }

    book.author = author;

    if (!author) {
      throw new Error("Failed to populate the author field");
    }

    return book;
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
      books: await BookModel.find(query, {}, options),
      count: await BookModel.countDocuments(query),
    };
  }),

  Update: CatchWrapDb(`${namespace}.Update`, async (args) => {
    if (!args.id) {
      throw new Error("id is required to update book");
    }

    let book = await BookModel.findOneAndUpdate(
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

    if (!book) {
      throw new Error(`book with given id is not found!`);
    }

    return book;
  }),

  Delete: CatchWrapDb(`${namespace}.Delete`, async (args) => {
    if (!args.id) {
      throw new Error("id is required to delete book");
    }

    const book = await BookModel.findOneAndDelete({ _id: args.id });

    if (!book) {
      throw new Error(`book with the given id is not found!`);
    }

    return {};
  }),
};

module.exports = BookStorage;
