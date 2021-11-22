# cms-employee-tracker

[![license](https://img.shields.io/static/v1?label=license&message=mit&color=red)](https://choosealicense.com/licenses/mit)

## Table of Contents

-   [Contributing](#contributing)
-   [Installation](#installation)
-   [Demonstration](#demonstration)
-   [Usage](#usage)
-   [Resources](#resources)
-   [Author](#author)
-   [License](#license)
-   [Questions](#questions)

## Description

This CLI application is built with <kbd>MySQL</kbd> database. Please make sure to install the required files on your local machine after cloning the repository.

## Contributing

I am always looking for contributors of all skill levels! If you have something in mind to add to the project, try out by [creating an issue](https://github.com/mckinleyvj/cms-employee-tracker/issues) and let's see where we can go from there.

[Back to top](#cms-employee-tracker)

## Installation

Fork and clone the repository, then install the required packages to run the application.

1. Fork the repository to your Github profile.

2. Clone the repository to your local desktop.

```bash
git clone git@github.com:mckinleyvj/cms-employee-tracker.git
```

3. Req: Install <kbd>node</kbd> dependencies. Use the latest version or a version higher than 14.0.0

```bash
npm i || npm install n -g || npm install v15.0.0 (Specific version)
```

4. Req: Install <kbd>MySQL</kbd> schema and seeds. Make sure to have MySQL installed on your local machine.

```bash
mysql -u root -p
source assets/db/schema.sql
source assets/db/seeds.sql
```

4. Run the application invoking <kbd>npm run start</kbd>

```bash
npm run start
```

[Back to top](#cms-employee-tracker)

## Demonstration

Please find the demonstration video here https://watch.screencastify.com/v/UY4s4iBS1B57434jNniw

[Back to top](#cms-employee-tracker)

## Usage

-   This project is a command line application that saves contents about a business structure.
-   This project does not collect any bank details or personal information for misuse.
-   This project is open source and is available to all developers that finds interest to enhancing features by raising [an issue](https://github.com/mckinleyvj/cms-employee-tracker/issues) or simply by [contacting me](#questions).

[Back to top](#cms-employee-tracker)

## Resources

-   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [NodeJS](https://nodejs.org/)
-   Node Packages:
    -   [MySQL2](https://www.npmjs.com/package/mysql2)
    -   [Inquirer](https://www.npmjs.com/package/inquirer)
    -   [Console.table](https://www.npmjs.com/package/console.table)

[Back to top](#cms-employee-tracker)

## Author

Mckinley Jimenez

-   [Portfolio](https://mckinleyvj.github.io/professional-portfolio/)
-   [GitHub](https://github.com/mckinleyvj)
-   [LinkedIn](https://www.linkedin.com/in/mckinleyjimenez)

[Back to top](#cms-employee-tracker)

## License

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the [mit](LICENSE) license.

[Back to top](#cms-employee-tracker)

## Questions

Visit my [GitHub profile](https://github.com/mckinleyvj) for more information about me and my other repositories.

You can also send me an <a href="mailto:mckinleyvj@gmail.com?">email</a> to know more information.

[Back to top](#cms-employee-tracker)
