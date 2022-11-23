import express from 'express';
import axios from 'axios';

const router = express.Router();

// in the example below, we will have the bot listen for the "crypto"
// keyword, and when someone in your GroupMe says it, we will respond 
// with the Bitcoin price from CMC. 
const BITCOIN = 'bitcoin';

const CRYPTO_REPORT = 'crypto report';

const GROUP_ME_BOT_ID = 'INSERT_GROUPME_BOT_ID_HERE';
const CMC_API_KEY = "YOUR_CMC_API_KEY_HERE";

const COINS = ['BTC', 'ETH', 'LINK', 'MATIC','LRC', 'SOL', 'ADA', 'XMR'];


const FULL_MOON_EMOJI = String.fromCodePoint(parseInt('1F315', 16));
const ROCKETSHIP_EMOJI = String.fromCodePoint(parseInt('1F680', 16));

router.post('/', (req, res) => {

	// the text property on the body obj is the last message sent. 
	// without some kind of filtering here, your bot would respond to every message
	// typically i've build bots to listen for keywords and then respond with custom text
	const text = req.body.text;

	// Lets lowercase the text before matching so its case insensitive
	const formatIncomingText = text.toLowerCase();


	if (formatIncomingText === BITCOIN){
		axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {

            headers: {
                "X-CMC_PRO_API_KEY": CMC_API_KEY
            },
            params: {
                symbol: "BTC"
            },
            json: true,
            gzip: true

        }).then((response) => {

            const price = response.data.data;
            const moreTraverse = Object.keys(price);
            const finalPrice = price[moreTraverse].quote.USD.price;

            // This is how you actually send text to the 
            axios.post("https://api.groupme.com/v3/bots/post", {
                bot_id: GROUP_ME_BOT_ID,
                text: "$" + finalPrice.toFixed(2)
                
            });

            // Make sure to close Nodejs
            res.end();

        });

	} else if (formatIncomingText === CRYPTO_REPORT){

		// If you wanted to generate a crypto of many tokens, here is one method
		// CMC doesnt allow for batch calls at my tier (at the time of wirting this)
		// So we will just loop through the X number of coins we want 

		// helper function for API setup 
		const returnAPIOptions = (coin) => {
	        return {
	            headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
	            params: { symbol: coin}, json: true, gzip: true
	        }
    	}

    	// Loop through your COINS array and get the current prices for each token
        const coinsArr = Promise.all(COINS.map(coin => {
            return new Promise((resolve, reject) => {
                axios.get(CMC_URL, returnOptions(coin)).then(response => {
                    const price = response.data.data;
                    const moreTraverse = Object.keys(price);
                    const finalPrice = price[moreTraverse].quote.USD.price;
                    resolve(coin + ' - ' + '$' + finalPrice.toLocaleString());
                });
            });

        })); 

        // Once your loop is complete format like so to get a more readable output. 
        Promise.all([coinsArr]).then(values => {
            const allPricesArr = values[0];

            axios.post("https://api.groupme.com/v3/bots/post", {
                bot_id: BOT_ID,
                text: 
                `
                Daily Crypto Report ${ROCKETSHIP_EMOJI} ${FULL_MOON_EMOJI} \n 
                ${allPricesArr[0]} \n 
                ${allPricesArr[1]} \n 
                ${allPricesArr[2]} \n 
                ${allPricesArr[3]} \n 
                ${allPricesArr[4]} \n 
                ${allPricesArr[5]} \n 
                ${allPricesArr[6]} \n 
                ${allPricesArr[7]}
                `
            });

            res.end(); 

        });

	} else {
		// If there are no matches, do nothing.
		res.end();
	}

});

module.exports = router;
