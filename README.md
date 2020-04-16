<p align="center">
  <a href="https://corona.rickkln.com">
    <img alt="corona" src="https://github.com/rickkln/corona/blob/master/src/images/coronavirus.png?raw=true" width="180" />
  </a>
</p>

<h1 align="center">
  Coronavirus Pandemic Status
</h1>

There are various great Covid-19 tracking and information websites. [EndCoronavirus.org](https://www.endcoronavirus.org/), which is backed by the NECSI, being the best one I have found.

This one aims to provide simple tools for live updates on the rate of change in
death count globally. Though it is mainly a venue for [me](https://rickkln.com) to play around with and learn GraphQL and React-Table among other things.
All data is pulled from the [COVID-19 data repository](https://github.com/CSSEGISandData/COVID-19) provided by Johns Hopkins University.
Which in turn pulls data from various government sources, and tracking projects such as [WorldoMeters](https://www.worldometers.info/coronavirus).

All code for this site is [open source](https://github.com/rickkln/corona). It is built with [Gatsby](https://www.gatsbyjs.org/) and consumes the Johns Hopkins data via a [GraphQl](https://github.com/rlindskog/covid19-graphql) API which in turn wraps a another [parser](https://github.com/pomber/covid19).

## 🔃 Differences in this repo with standard Gatsby

1.  [TypeScript](https://www.typescriptlang.org/) is used for a better developer experience.

1.  [ESLint](https://eslint.org/) and the [AirBnB](https://github.com/airbnb/javascript) TypeScript style guide help you avoid, and fix, simple issues in your code.

1. The default Gatsby formating tool, [Prettier](https://prettier.io/), has been removed in order to avoid conflicts with the ESLint + AirBnB TypeScript tools described above.

## 🚀 Quick start

1.  **Clone this repository.**

    ```shell
    # Clone the repo
    git clone https://github.com/rickkln/corona
    ```

1.  **Navigate into the cloned folder.**

    Navigate into your new site’s directory and start it up:

    ```shell
    cd corona/
    gatsby develop
    ```

1.  **Open the source code and start editing.**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `corona` directory in your code editor of choice and edit away. Save your changes and the browser will update in real time!

1.  **Submit your changes!**

    Once you are ready to submit your changes you can simply submit a Pull Request to this repo.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── node_modules
    ├── src
    ├── .eslintrc.js
    ├── .gitignore
    ├── firebase.json
    ├── gatsby-config.js
    ├── LICENSE.md
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tsconfig.json

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

1.  **`.eslintrc.js`**: This is a configuration file for [ESLint](https://eslint.org/). ESLint is a tool to help you avoid and fix simple issues in your code.

1.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

1.  **`firebase.json`**: This is a configuration file that lists your Firebase project configuration. Learn more about this file in the [Firebase docs](https://firebase.google.com/docs/hosting/full-config).

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

1.  **`LICENSE.md`**: Gatsby itself, the primary dependency of this project is licensed under the MIT license, however the original code in this project is licensed under the Mozilla Public License 2.0.

1. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

1. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

1. **`README.md`**: This text file, which contains useful reference information about your project.

1.  **`tsconfig.json`**: This is a configuration file for TypeScript. The tsconfig.json file specifies the root files and the compiler options required for the TypeScript compiler to compile the project. More details are available in the [TypeScript docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## 🎓 Need some help with Gatsby?

If you are looking for more guidance on Gatsby which this project is built in you can use the [official documentation for Gatsby](https://www.gatsbyjs.org/). Here are some useful places to start:

- **The official [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **The Gatsby [code samples](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

- **The documentation on the [TypeScript Plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/).** This is specifically useful if you are forking this project, as it uses TypeScript.

## 📝 License

The original code in this repo is licensed under the GNU General Public License v3.0. For more information view the [LICENSE](https://github.com/rickkln/corona/blob/master/LICENSE.md) file.
