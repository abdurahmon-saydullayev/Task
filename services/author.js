const AuthorStorage = require("../storage/mongo/author");
const CatchWrapService = require("../wrappers/service");

const namespace = "Service.Author";

const AuthorService = {
    Create: CatchWrapService(`${namespace}.Create`, AuthorStorage.Create),
    GetByID: CatchWrapService(`${namespace}.GetByID`, AuthorStorage.GetByID),
    GetList: CatchWrapService(`${namespace}.GetList`, AuthorStorage.GetList),
    Update: CatchWrapService(`${namespace}.Update`, AuthorStorage.Update),
    Delete: CatchWrapService(`${namespace}.Delete`, AuthorStorage.Delete),
};

module.exports = AuthorService;
