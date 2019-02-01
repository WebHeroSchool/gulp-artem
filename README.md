# Workflow for building web application

- [Handelbars](http://handlebarsjs.com/)
- [PostCSS](https://github.com/postcss/postcss)
  - [Assets](https://github.com/assetsjs/postcss-assets)
  - [Nested](https://github.com/postcss/postcss-nested)
  - [Sorting](https://github.com/hudochenkov/postcss-sorting)
  - [Short](https://github.com/jonathantneal/postcss-short)
  - [Reporter](https://github.com/postcss/postcss-reporter)
  - [Autoprefixer](https://github.com/postcss/autoprefixer)
- [ESLint](http://eslint.org/)
- [StyleLint](https://www.npmjs.com/package/stylelint)
- [Gulp](http://gulpjs.com/)
- [Browser-sync](https://www.browsersync.io/)

## Global dependencies

You must have installed: `node`, `npm`, `gulp`.

##How to work with this project

1. `git clone git@github.com:WebHeroSchool/gulp-artem.git app`
2. `cd app`
3. `npm i`
4. `gulp`
   ... or
   `NODE_ENV=production gulp`
   (for production version)

---

## Project structure

- `dev/`
  - `index.hbs` entry-point
  - `css/index.css` entry-point styles
  - `js/index.js` entry-point scripts
  - `data.json` handlebars context
  - `fonts/`
  - `templates/`
    - `template/`
      - `template.hbs` template
- `eslintrc.json` eslint rules
- `stylelintrc.json` stylilint rules
