module.paths.push('C:\\Users\\Ellen\\AppData\\Roaming\\npm\\node_modules');
const puppeteer = require('puppeteer');
var fs = require('fs');
var path = require('path');

const directory = 'C:\\Users\\Ellen\\Documents\\0 ugent\\Thesis\\github off\\scripts\\web'

function makePdf(name) {
    console.log('generating pdf for ' + name + '...');

    (async() => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('file://' + directory + '/' + name + '.html')
        await page.pdf({
            path: 'pdf/' + name + '.pdf',
            format: 'A4'
        })
        await browser.close()
    })()
}



if (process.argv.length === 2) {
    console.log('generate all files in /web\n');

    fs.readdir(directory, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        files.forEach(function(file, index) {
            var filepath = path.join(directory, file);
            fs.stat(filepath, function(error, stat) {
                var extension = file.slice(-4);
                if (stat.isFile() && extension === 'html') {
                    var name = file.slice(0, -5);
                    makePdf(name);
                }

            })
        });
    });




} else {
    for (var i = 2; i < process.argv.length; i++) {
        console.log(process.argv[i]);
        var name = process.argv[i];
        makePdf(name);
    }
}