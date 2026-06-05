const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'out');

function replaceInFile(filePath)
{
    fs.readFile(filePath, 'utf8', (err, data) =>
    {
        if (err)
        {
            console.error(`Error reading the file: ${ filePath }`, err);
            return;
        }

        if (data.includes('/assets/'))
        {
            const result = data.replace(/\/assets\//g, 'assets/');

            fs.writeFile(filePath, result, 'utf8', (err) =>
            {
                if (err)
                {
                    console.error(`Error writing back to the file: ${ filePath }`, err);
                    return;
                }

                console.log(`The file has been updated: ${ filePath }`);
            });
        }
    });
}

function replaceInFiles(directory)
{
    fs.readdir(directory, { withFileTypes: true }, (err, files) =>
    {
        if (err)
        {
            console.error(`Error reading the directory: ${ directory }`, err);
            return;
        }

        files.forEach(file =>
        {
            const filePath = path.join(directory, file.name);

            if (file.isDirectory())
                replaceInFiles(filePath);
            else
                replaceInFile(filePath);
        });
    });
}

replaceInFiles(directoryPath);
