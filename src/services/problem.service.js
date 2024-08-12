const sanitizeMarkdownContent = require("../utils/markdownSanitizer");

class ProblemService {
    constructor(ProblemRepository){
        this.ProblemRepository = ProblemRepository;
    }

    async createProblem (problemData) {
        try {
            // Sanitize markdown for the description
            problemData.description = sanitizeMarkdownContent(problemData.description);

            const problem = await this.ProblemRepository.createProblem(problemData);

            return problem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProblems (){
        const problems = await this.ProblemRepository.getAllProblems();
        return problems;
    }
}

module.exports = ProblemService;