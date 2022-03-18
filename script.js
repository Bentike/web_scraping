const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('data.csv');

// Create Headers
writeStream.write(`Country, Year, Area, Population, GDP per capital, Population density, Vehicle ownership, Total road deaths, Road deaths per Million Inhabitants \n`);

request('https://en.wikipedia.org/wiki/Road_safety_in_Europe', (err, response, html) => {
    if(!err && response.statusCode == 200){
        const $ = cheerio.load(html);
        const header =  $('.sortable');
        const tr = header.find('tr');
        for(let i = 1; i < tr.length; i++){
            let trow = tr[i];
            let td = $(trow).find('td').text().split(`\n`);

            //Write Row To CSV File
            writeStream.write(`${td[0]}, 2018, ${td[1]}, ${td[2]}, ${td[3]}, ${td[4]}, ${td[5]}, ${td[6]}, ${td[7]} \n`);
        }
        
        console.log("Scraping Done...")
    }
});
