const fs = require('fs');
const path = './out/index.html';

fs.readFile(path, 'utf8', (err, data) =>
{
    if (err)
    {
        console.error('Error reading the file:', err);
        return;
    }

    const result = data.replace(/crossorigin=""/g, '');

    fs.writeFile(path, result, 'utf8', (err) =>
    {
        if (err)
        {
            console.error('Error writing back to the file:', err);
            return;
        }

        console.log('The file has been updated.');
    });
});
