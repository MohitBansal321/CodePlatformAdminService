const problemService = require('../services/problem.service');
const problemRepository = require('../repositories/problem.repository');
const problemController = require('../controllers/problem.controller');
const {StatusCodes} = require('http-status-codes');

jest.mock('../services/problem.service');

describe('tests', () => { 
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };
        next = jest.fn();
    });
    test('Should Get All Problems', async () => { 
        const problems = [];
        problemService.prototype.getAllProblems.mockResolvedValue(problems);
        await problemController.getProblems(req,res,next);
    
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(problemService.prototype.getAllProblems).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();
      });

    test('Get Problem throws a not found error', async () => {
        const mockError = new Error('id',10);
        problemService.prototype.getProblem.mockRejectedValue(mockError);
        req.params = {id:10};
        await problemController.getProblem(req,res,next);
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    })
 });

 
