'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the kickass ${chalk.red('generator-irian-lib')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your library name',
        default: 'demo-web-lib'
      },
      {
        type: 'input',
        name: 'prefix',
        message: 'Your library name',
        default: 'dwl'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  async writing() {

    await this.fs.copyTpl(
      this.templatePath('demo-web-lib/package.json'),
      this.destinationPath(`${this.props.name}/package.json`), {
        name: this.props.name
      }
    );

    await this.fs.copyTpl(
      this.templatePath('demo-web-lib/src/package.json'),
      this.destinationPath(`${this.props.name}/src/package.json`), {
        name: this.props.name
      }
    );
    await this.fs.copyTpl(
      this.templatePath('demo-web-lib/src/i18n/en.json'),
      this.destinationPath(`${this.props.name}/src/i18n/en.json`), {
        prefix: this.props.prefix
      }
    );
    await this.fs.copyTpl(
      this.templatePath('demo-web-lib/src/i18n/ro.json'),
      this.destinationPath(`${this.props.name}/src/i18n/ro.json`), {
        prefix: this.props.prefix
      }
    );
    await  this.fs.copyTpl(
      this.templatePath('demo-web-lib/src/i18n/de.json'),
      this.destinationPath(`${this.props.name}/src/i18n/de.json`), {
        prefix: this.props.prefix
      }
    );


    this.fs.copyTpl(
      this.templatePath('demo-web-lib/.angular-cli.json'),
      this.destinationPath(`${this.props.name}/.angular-cli.json`), {
        prefix: this.props.prefix,
        name: this.props.name
      }
    );
    mkdirp.sync(path.join(this.destinationPath(), `${this.props.name}/src/app`));
    mkdirp.sync(path.join(this.destinationPath(), `${this.props.name}/src/assets`));

    this.fs.copy(
      this.templatePath('demo-web-lib/src/.npmrc'),
      this.destinationPath(`${this.props.name}/src/.npmrc`)
    );
    this.fs.copy(
      this.templatePath('demo-web-lib/src/public_api.ts'),
      this.destinationPath(`${this.props.name}/src/public_api.ts`)
    );
    this.fs.copy(
      this.templatePath('demo-web-lib/src/index.ts'),
      this.destinationPath(`${this.props.name}/src/index.ts`)
    );
    this.fs.copy(
      this.templatePath('demo-web-lib/tsconfig.json'),
      this.destinationPath(`${this.props.name}/tsconfig.json`)
    );
    this.fs.copy(
      this.templatePath('demo-web-lib/README.md'),
      this.destinationPath(`${this.props.name}/README.md`)
    );
  }

  install() {
    process.chdir(path.join(process.cwd(), this.props.name));
    this.installDependencies({bower:false});
  }
};
