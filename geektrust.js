const fs = require("fs");
const filename = process.argv[2]

let current_prortfolio = [];
let rawdata = require('./stock_data.json')
let stockData = rawdata
function main(dataInput) {
    var inputLines = dataInput.toString().split("\n")
    for (i = 0; i < inputLines.length; i++) {
        if (inputLines) {
            let input = inputLines[i].split(' ')
            switch (input[0]) {
                case 'CURRENT_PORTFOLIO':
                    current_prortfolio = input;
                    break;
                case 'CALCULATE_OVERLAP':
                    calculateOverlap(input[1].trim(), current_prortfolio);
                    break;
                case 'ADD_STOCK':
                    for (k = 0; k < stockData.funds.length; k++) {
                        if (stockData.funds[k].name === input[1].trim()) {
                            stockData.funds[i].stocks.push(input[2]);
                        }
                    }
                    break;
            }
        }
    }
}
data = fs.readFileSync(process.argv[2]).toString();
const calculateOverlap = (fundName, fundList) => {
    let currentFund = stockData.funds.find(elment => elment.name === fundName);
    if(!currentFund){
        console.log('FUND_NOT_FOUND');
        return;
    }
    let stockA = currentFund.stocks;
    let stockALen = currentFund.stocks.length;
    for (j = 1; j < fundList.length; j++) {
        let fundB = stockData.funds.find(elment => elment.name === fundList[j].trim());
        
        let stockB = fundB.stocks;
        let stockBLen = fundB.stocks.length;
        const filteredArray = stockA.filter(value => stockB.includes(value));
        const overlapPer = (2 * filteredArray.length) / (stockALen + stockBLen) * 100
        console.log(fundName+' '+fundList[j].trim()+' '+overlapPer.toFixed(2)+'%');
    }
}
main(data);


module.exports = { main }
