# Javacord Website

This repository includes the source code for our website [javacord.org](https://javacord.org/).

## 🤔 I just want to use Javacord

In this case you are wrong here. Just head over to the [Javacord repository](https://github.com/Javacord/Javacord).

## 🏃‍♀️ How to run the website locally

The website uses the [Yarn](https://yarnpkg.com/) package manager.
Make sure to have it installed on your machine.

After you have installed Yarn, you can run
```
yarn install
```
inside the root of this project to install all dependencies.

Afterwards, you can run the website with
```
yarn dev
```

## 🗃 Repository structure

The repository has two branches: The `master` branch and the `gh-pages` branch.
The `master` branch contains the actual source code of the repository.
The `gh-pages` branch contains the generated static files (using `yarn build`) that are actually deployed.

## 💡 Article format

Every wiki page has the following format:

```md
---
keywords:
- A
- list
- with
- keywords
---

# Headline 

Some text

## :emoji: Subtitle 1

More text

### Subsubtitle

Even more text

## :another-emoji: Subtitle 2

...
```

Every article must have exactly `1` headline (single `#`) that is used as the article's title.
The headline must not start or contain emojis.

An article can have multiple subtitles which all must start with a single emoji.
You can find a list with all supported emojis [here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).
Do not use unicode directly, but a tag like `:clown_face:` (:clown_face:).
Subsubtitles (and lower) should not use emojis.

Every wiki page has a list of keywords at the beginning of the file.
They are used by our [Discord Bot](https://github.com/Javacord/Javacord-Bot)'s `!wiki` command to search the wiki.

## ✒️ Editing existing wiki pages

Editing an existing page is pretty straight forward, as the pages are written in simple markdown.
There are some markdown extensions available which are documented in the VuePress wiki at
[Markdown Extensions](https://vuepress.vuejs.org/guide/markdown.html).

Additionally, the keywords array should be updated if necessary.

## 🤰🏼 Adding new wiki pages

Adding new wiki articles is similar to editing an existing one.
The only difference is, that you have to add the new article to the sidebar by editing the `sidebar` object in the
[`/docs/.vuepress/config.ts`](docs/.vuepress/config.ts) file.