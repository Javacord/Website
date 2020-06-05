const { logger, fs, path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
    async generated () {
        const { outDir } = context;
        logger.wait('Generating search index for Discord bot...');
        const searchIndexPath = path.resolve(outDir, 'bot-search-index.json');
        const data = context.pages.map(page => ({
            title: page.title,
            headers: page.headers,
            content: page._strippedContent,
            path: page.path,
            keywords: (page.frontmatter || {}).keywords || []
        }));
        await fs.writeFile(searchIndexPath, JSON.stringify(data));
    }
})