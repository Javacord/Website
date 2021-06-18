module.exports = {
  title: 'Javacord',
  description: 'The Javacord website',
  theme: 'yuu',
  head: [
    ['link', { rel: 'icon', href: '/favicon-96x96.png' }]
  ],
  themeConfig: {
    smoothScroll: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Wiki', link: '/wiki/' },
      { text: 'JavaDocs', link: 'https://docs.javacord.org/' },
      { text: 'Discord Server', link: 'https://discord.gg/0qJ2jjyneLEgG7y3' },
      { text: 'GitHub', link: 'https://github.com/Javacord/Javacord' },
      { text: 'Legal',
        items: [
          { text: 'Imprint', link: '/imprint' },
          { text: 'Privacy Policy', link: '/privacy-policy' }
        ]
      },
    ],
    yuu: {
      defaultDarkTheme: false,
      disableThemeIgnore: true,
      labels: {
        darkTheme: 'Enable Dark Theme', // Default is "Enable Dark Theme?"
      },
    },
    sidebar: {
      '/wiki/': [
        {
          title: 'Getting Started',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            ['getting-started/', 'Intro'],
            'getting-started/download-installation',
            'getting-started/creating-a-bot-account',
            'getting-started/writing-your-first-bot',
            {
              title: 'Beginner IDE Setup',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                'getting-started/setup/intellij-gradle',
                'getting-started/setup/intellij-maven',
                'getting-started/setup/eclipse-maven',
              ]
            }
          ]
        },
        {
          title: 'Basic Tutorials',
          collapsable: false,
          sidebarDepth: 1,
          children: [
              {
                  title: 'Interactions',
                  collapsable: true,
                  sidebarDepth: 1,
                  children: [
                      'basic-tutorials/interactions/commands',
                      'basic-tutorials/interactions/components'
                  ]
              },
            'basic-tutorials/listeners',
            'basic-tutorials/gateway-intents',
            'basic-tutorials/embeds',
            'basic-tutorials/emojis-and-reactions',
            'basic-tutorials/message-builder',
            'basic-tutorials/creating-entities',
            'basic-tutorials/logger-config',
            'basic-tutorials/glossary',
          ]
        },
        {
          title: 'Advanced Topics',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'advanced-topics/bot-lifecycle',
            'advanced-topics/entity-cache',
            'advanced-topics/playing-audio',
            'advanced-topics/ratelimits',
            'advanced-topics/sharding',
            'advanced-topics/performance-tweaks',
            'advanced-topics/proxies',
          ]
        },
        {
          title: 'Essential Knowledge',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            'essential-knowledge/lambdas',
            'essential-knowledge/optionals',
            'essential-knowledge/completable-futures',
          ]
        }
      ]
    },
    // Repo details for "Edit this page on GitHub" footer
    docsRepo: 'Javacord/Website',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub'
  },
  markdown: {
    extendMarkdown: md => {
      // katex for LaTeX Math equation
      md.use(require('@traptitech/markdown-it-katex'))
    }
  },
  plugins: [
    require('./../../plugins/bot-api')
  ]
};