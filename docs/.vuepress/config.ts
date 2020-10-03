import {defaultTheme} from '@vuepress/theme-default'
import {searchPlugin} from '@vuepress/plugin-search'
import {palettePlugin} from '@vuepress/plugin-palette'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import {path} from '@vuepress/utils'
import {botSearch} from '../../plugins/bot-api'


export default {
    title: 'Javacord',
    description: 'The Javacord website',
    theme: defaultTheme({
        colorMode: 'dark',
        colorModeSwitch: true,
        navbar: [
            {text: 'Home', link: '/'},
            {text: 'Wiki', link: '/wiki/'},
            {text: 'JavaDocs', link: 'https://docs.javacord.org/'},
            {text: 'Discord Server', link: 'https://discord.gg/javacord'},
            {text: 'GitHub', link: 'https://github.com/Javacord/Javacord'},
            {
                text: 'Legal',
                children: [
                    {text: 'Imprint', link: '/imprint'},
                    {text: 'Privacy Policy', link: '/privacy-policy'}
                ]
            },
        ],
        sidebarDepth: 1,
        sidebar: {
            '/wiki/': [
                {
                    text: 'Getting Started',
                    collapsible: false,
                    children: [
                        '/wiki/getting-started/README.md',
                        '/wiki/getting-started/download-installation',
                        '/wiki/getting-started/creating-a-bot-account',
                        '/wiki/getting-started/writing-your-first-bot',
                        {
                            text: 'Beginner IDE Setup',
                            //@ts-ignore
                            collapsible: true,
                            children: [
                                '/wiki/getting-started/setup/intellij-gradle',
                                '/wiki/getting-started/setup/intellij-maven',
                                '/wiki/getting-started/setup/eclipse-maven',
                            ]
                        },
                        '/wiki/getting-started/faq',
                    ]
                },
                {
                    text: 'Basic Tutorials',
                    collapsible: false,
                    children: [
                        {
                            text: 'Interactions',
                            collapsible: true,
                            children: [
                                '/wiki/basic-tutorials/interactions/commands',
                                '/wiki/basic-tutorials/interactions/components',
                                '/wiki/basic-tutorials/interactions/responding'
                            ]
                        },
                        '/wiki/basic-tutorials/listeners',
                        '/wiki/basic-tutorials/gateway-intents',
                        '/wiki/basic-tutorials/embeds',
                        '/wiki/basic-tutorials/emojis-and-reactions',
                        '/wiki/basic-tutorials/message-builder',
                        '/wiki/basic-tutorials/creating-entities',
                        '/wiki/basic-tutorials/logger-config',
                        '/wiki/basic-tutorials/running',
                        '/wiki/basic-tutorials/glossary',
                    ]
                },
                {
                    text: 'Advanced Topics',
                    collapsible: false,
                    children: [
                        '/wiki/advanced-topics/bot-lifecycle',
                        '/wiki/advanced-topics/entity-cache',
                        '/wiki/advanced-topics/playing-audio',
                        '/wiki/advanced-topics/ratelimits',
                        '/wiki/advanced-topics/sharding',
                        '/wiki/advanced-topics/performance-tweaks',
                        '/wiki/advanced-topics/proxies',
                    ]
                },
                {
                    text: 'Essential Knowledge',
                    collapsible: false,
                    children: [
                        '/wiki/essential-knowledge/lambdas',
                        '/wiki/essential-knowledge/optionals',
                        '/wiki/essential-knowledge/completable-futures',
                    ]
                }
            ]
        },

        // Repo details for "Edit this page on GitHub" footer
        docsRepo: 'Javacord/Website',
        docsDir: 'docs',
        docsBranch: 'master',
        editLink: true,
        editLinkText: 'Edit this page on GitHub'
    }),
    head: [
        ['link', {rel: 'icon', href: '/favicon-96x96.png'}]
    ],
    markdown: {
        extendMarkdown: md => {
            // katex for LaTeX Math equation
            md.use(require('@traptitech/markdown-it-katex'))
        },
        importCode: {
            handleImportPath: (str) => {
                return str.replace(/^@core/, path.resolve(__dirname, '../../../Javacord/javacord-core/src/main/java/org/javacord/core'))
                    .replace(/^@api/, path.resolve(__dirname, '../../../Javacord/javacord-core/src/main/java/org/javacord/api'))
                    .replace(/^@examples/, path.resolve(__dirname, '../../../Javacord/examples/src/wiki/'));
            },

        },
    },
    plugins: [
        botSearch(),
        searchPlugin({
            // options
        }),
        registerComponentsPlugin({
            /*components: {
                LatestVersionInfo: path.resolve(__dirname, './components/LatestVersion.vue'),
            },*/
            componentsDir: path.resolve(__dirname, './components'),
        }),
        palettePlugin({
            preset: 'sass'
        }),
    ]
};