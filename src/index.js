#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const { readdir, writeFile, readFile } = require('fs').promises;
const { exec } = require('child_process');

const configFolderPath = path.resolve(__dirname, 'configs');

(async () => {
  const globals = await readdir(`${configFolderPath}/global`).catch(
    console.log,
  );

  const output = [];

  const outputItem = (name, path) => {
    return {
      name,
      path: `${configFolderPath}/${path}`,
    };
  };

  // Global config files
  const { files } = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select config files',
      name: 'files',
      choices: globals,
    },
  ]);

  files.forEach((file) => output.push(outputItem(file, 'global/' + file)));

  const frameworkChoices = await readdir(
    `${configFolderPath}/frameworks`,
  ).catch(console.log);

  // Framework specific files
  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      message: 'What framework are you doing?',
      name: 'framework',
      choices: [...frameworkChoices, 'none'],
    },
  ]);

  if (framework !== 'none') {
    const frameworkFilesList = await readdir(
      `${configFolderPath}/frameworks/${framework}`,
    );

    const { frameworkFiles } = await inquirer.prompt([
      {
        type: 'checkbox',
        message: `Select ${framework} config files`,
        name: 'frameworkFiles',
        choices: frameworkFilesList,
      },
    ]);

    frameworkFiles.forEach((file) =>
      output.push(outputItem(file, `frameworks/${framework}/${file}`)),
    );
  }

  // Write files to root
  output.forEach(async (config) => {
    const content = await readFile(config.path).catch(console.error);
    writeFile(config.name, content, null, 2).catch(console.error);
  });

  const { runEslintInstall } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'runEslintInstall',
      message: 'Do you want to install the eslint-config-jimme?',
      default: true,
    },
  ]);

  if (runEslintInstall) {
    const { packageManager } = await inquirer.prompt([
      {
        type: 'list',
        name: 'packageManager',
        message: 'What package manager do you use?',
        choices: ['yarn', 'npm'],
      },
    ]);

    let command = `yarn add -D eslint-config-jimme`;
    if (packageManager === 'npm') {
      command = `npm install --save-dev eslint-config-jimme`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) console.error(error);
      if (stderr) console.error(stderr);
      console.log(stdout);
    });
  }
})();
