const {StatusCodes}=require('http-status-codes');
const NotImplemented = require('../errors/notImplemented.error');

function pingProblemController(req,res){
    res.json({message:"Problem controller is up"})
}

function addProblem(req,res,next){
    try {
        // Nothing Implement yet
        throw new NotImplemented('Add Problem');
    } catch (error) {
        next(error);
    }
}

function getProblem(req,res,next){
    try {
        // Nothing Implement yet
        throw new NotImplemented('Get Problem');
    } catch (error) {
        next(error);
    }
}

function getProblems(req,res,next){
    try {
        // Nothing Implement yet
        throw new NotImplemented('Get All Problem');
    } catch (error) {
        next(error);
    }
}

function deleteProblem(req,res,next){
    try {
        // Nothing Implement yet
        throw new NotImplemented('Delete Problem');
    } catch (error) {
        next(error);
    }
}

function updateProblem(req,res,next){
    try {
        // Nothing Implement yet
        throw new NotImplemented('Update Problem');
    } catch (error) {
        next(error);
    }
}

module.exports={
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController

}