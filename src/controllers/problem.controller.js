const { StatusCodes }=require('http-status-codes');
const NotImplemented = require('../errors/notImplemented.error');
const { ProblemService } = require('../services');
const { ProblemRepository } = require('../repositories');
const NotFound = require('../errors/notFound.error');

const problemService = new ProblemService(new ProblemRepository());
function pingProblemController(req,res){
    res.json({message:"Problem controller is up"})
}

async function addProblem(req,res,next){
    try {
        const newProblem = await problemService.createProblem(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created new problem",
            error: {},
            data: newProblem
        })
    } catch (error) {
        next(error);
    }
}

async function getProblem(req,res,next){
    try {
        const id = req.params.id;
        const problem = await problemService.getProblem(id);

        if(!problem){
            throw new NotFound('Problem',id);
        }
        
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched a problem",
            error: {},
            data: problem
        });

    } catch (error) {
        next(error);
    }
}

async function getProblems(req,res,next){
    try {
        const problems = await problemService.getAllProblems();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched all the problems",
            error: {},
            data: problems
        });
    } catch (error) {
        next(error);
    }
}

async function deleteProblem(req,res,next){
    try {
        const id = req.params.id;
        const problem = await problemService.deleteProblem(id);

        if(!problem){
            throw new NotFound('Delete Problem',id);
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully deleted a problem",
            error: {},
            data: problem
        });

    } catch (error) {
        next(error);
    }
}

async function updateProblem(req,res,next){
    try {
        const id = req.params.id;
        const data = req.body;
        const problem = await problemService.updateProblem(id,data);

        if(!problem){
            throw new NotFound('Update Problem',id);
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated a problem",
            error: {},
            data: problem
        }); 
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