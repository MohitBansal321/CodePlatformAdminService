const sanitizeMarkdownContent = require("../utils/markdownSanitizer");

class ProblemService {
    constructor(ProblemRepository){
        this.ProblemRepository = ProblemRepository;
    }

    async createProblem (problemData) {
        // Sanitize markdown for the description
        problemData.description = sanitizeMarkdownContent(problemData.description);

        const problem = await this.ProblemRepository.createProblem(problemData);

        return problem;
    }

    async getAllProblems (){
        const problems = await this.ProblemRepository.getAllProblems();
        return problems;
    }

    async getProblem (id){
        const problem = await this.ProblemRepository.getProblem(id);
        return problem;
    }
}

module.exports = ProblemService;