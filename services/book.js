const BookStorage = require("../storage/mongo/book");
const CatchWrapService = require("../wrappers/service");

const namespace = "Service.Book";

const BookService = {
  Create: CatchWrapService(`${namespace}.Create`, BookStorage.Create),
  GetByID: CatchWrapService(`${namespace}.GetByID`, BookStorage.GetByID),
  GetList: CatchWrapService(`${namespace}.GetList`, BookStorage.GetList),
  Update: CatchWrapService(`${namespace}.Update`, BookStorage.Update),
  Delete: CatchWrapService(`${namespace}.Delete`, BookStorage.Delete),
};

module.exports = BookService;
