import {logger, fs, path} from '@vuepress/shared-utils'
import {App} from "vuepress";

export const botSearch = () => {
    logger.info('Generating search index for Discord bot...');

    return {
        name: 'bot-search-plugin',
        onGenerated: async (app: App) => {
            const searchIndexPath = path.resolve(app.dir.public(), 'bot-search-index.json');
            const data = app.pages
                .filter(page => page.title)
                .map(page => ({
                    title: page.title,
                    headers: page.headers,
                    content: page.content,
                    path: page.path,
                    keywords: (page.frontmatter || {}).keywords || []
                }));
            await fs.writeFile(searchIndexPath, JSON.stringify(data));
        },
    }
}