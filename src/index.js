#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const { readdir, writeFile, readFile } = require('fs').promises;

const configFolderPath = path.resolve(__dirname, 'configs');


(async () => {
    const files = await readdir(configFolderPath).catch(console.log);

    const { stack } = await inquirer.prompt([
        {
            type: 'list',
            message: 'Are you working on front-end or back-end?',
            name: 'stack',
            choices: ['Front-end', 'Back-end']
        }
    ]);

    let configs = [];
    if (stack === 'Front-end') {
        const { framework } = await inquirer.prompt([
            {
                type: 'list',
                message: "What framework are you using?",
                name: 'framework',
                choices: ['Vue', 'none']
            }
        ])
        
        const fw = framework.toLowerCase();
        const files = await readdir(configFolderPath + '/' + fw);
        files.forEach(file => {

            configs.push(
                {
                    filename: file,
                    path: configFolderPath + '/' + fw + '/' + file
                }
            )
        })
    }

    configs.forEach(async config => {
        const content = await readFile(config.path).catch(console.log);
        writeFile(config.filename, JSON.stringify(content.toString(), null, 2));
    })

})();
