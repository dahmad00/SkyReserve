const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    var message = 'Unknown Error'
    err.statusCode = err.statusCode || 500;

    console.log("Message",err.message)
    console.log("Name",err.name)

    if (err.message == "EmptyContentError") {
        message = `Resource not found. Invalid path`;
        error = new ErrorHandler(message, 404);
    }

    if (err.message == "RecordNotFound") {
        message = `Resource not found. Invalid path`;
        error = new ErrorHandler(message, 404);
    }

    if (err.message == "ContentUpdationError") {
        message = `There was an error updating the content`;
        error = new ErrorHandler(message, 500);
    }

    if (err.message == "ContentCreationError") {
        message = `There was an error creating the content`;
        error = new ErrorHandler(message, 500);
    }
    if (err.message == "ContentRetreivalError") {
        message = `There was an error retreiving the content`;
        error = new ErrorHandler(message, 500);
    }

    if (err.message == "ContentAccessError") {
        message = `There was an error accessing the required content`;
        error = new ErrorHandler(message, 501);
    }

    if (err.message == "RecordSelectionError") {
        message = `There was an error selecting your desired record`;
        error = new ErrorHandler(message, 500);
    }
    

    if (err.message == "RecordNotPresent") {
        message = `The record you want to delete was not present`;
        error = new ErrorHandler(message, 404);
    }

    if (err.message == "UnknownDeletionError") {
        message = `There was an error deleting your desired record`;
        error = new ErrorHandler(message, 404);
    }


    //res.status(error.statusCode).send(message)



    // // Handling Mongoose Validation Error
    // if (err.name == "ValidationError") {
    //     const message = Object.values(err.errors).map((val) => val.message);
    //     error = new ErrorHandler(message, 400);
    // }
};
