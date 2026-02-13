const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

async function fetchStockData(symbol) {
    try {
        const quote = await yahooFinance.quote(symbol);
        console.log(`--------------------------------------------------`);
        console.log(`Symbol: ${quote.symbol}`);
        console.log(`Price: ${quote.regularMarketPrice} ${quote.currency}`);
        console.log(`Change: ${quote.regularMarketChange} (${quote.regularMarketChangePercent}%)`);
        console.log(`Market State: ${quote.marketState}`);
        console.log(`--------------------------------------------------`);
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
    }
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("Usage: node stock_crawler.js <SYMBOL1> <SYMBOL2> ...");
        console.log("Example: node stock_crawler.js AAPL TSLA");
        return;
    }

    for (const symbol of args) {
        await fetchStockData(symbol);
    }
}

main();
