const market = require('marked');
const sanitizeHtmlLibrary  = require('sanitize-html');
const TurndownService = require('turndown')

function sanitizeMarkdownContent(markdownContent) {
    var turndownService = new TurndownService();
    
    // Convert Markdown to html
    const convertedHtml = market.parse(markdownContent);

    // Sanitize Html
    const sanitizedHtml = sanitizeHtmlLibrary(convertedHtml, {
        allowedTags : sanitizeHtmlLibrary.defaults.allowedTags
    });

    // Convert Sanitize Html to Markdown
    const sanitizedMarkdown = turndownService.turndown(sanitizedHtml);
    return sanitizedMarkdown;
}

module.exports = sanitizeMarkdownContent;