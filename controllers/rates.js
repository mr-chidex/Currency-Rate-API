const fetch = require("node-fetch");

// @Route GET /api/rates
// query example ?base=CZK&currency=SEK,GBP
module.exports = async (req, res, next) => {
    try {
        const { base, currency } = req.query;

        let rates = await fetch("https://api.exchangeratesapi.io/latest");
        rates = await rates.json();
        rates = rates;

        //if no query parameter was specify
        if (!base && !currency) {
            return res.status(200).json({ results: rates })
        }

        // if there's a query parameter
        if (!base) { return res.status(400).json({ message: "please specify home currency rate" }) }
        if (!currency) { return res.status(400).json({ message: "please specify specific exchange rate" }) }

        //change currency query to uppercase if in lowercase
        const exchangeRates = currency.toUpperCase().split(",");

        let currencyExchangeRates = {}

        for (const exchangeRate of exchangeRates) {
            //trim white space
            const value = exchangeRate.trim();
            currencyExchangeRates = { ...currencyExchangeRates, [value]: rates.rates[value] }
        }

        res.json({
            results: {
                base: base,
                date: new Date().toLocaleDateString(),
                rates: currencyExchangeRates
            }
        })
    }
    catch (err) {
        next(new Error(err.message))
    }
}