const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});
afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should create a function named `priceCheck` that takes a price and returns `match` if the price is equivalent to `1.50`', async function() {
      const result = await page.evaluate(() => {
        return priceCheck(1.50);
      });

      expect(result).toBe('match');
  });

  it('should return `match` when the string `1.50` is passed in as an argument to `priceCheck`', async function() {
      const result = await page.evaluate(() => {
        return priceCheck('1.50');
      });

      expect(result).toBe('match');        
  });

  it('should not return `match` when `1.00` is passed in as an argument to `priceCheck`', async function() {
      const result = await page.evaluate(() => {
        return priceCheck(1.00);
      });

      expect(result).not.toBe('match');
  });

  it('should create a function named `strictPriceCheck` that takes a price and returns `match` only if the price is a number that is strictly equivalent to `1.50`', async function() {
      const result = await page.evaluate(() => {
        return strictPriceCheck(1.50);
      });

      expect(result).toBe('match');       
  });

  it('should not return `match` when the string `1.50` is passed in as an argument to `strictPriceCheck`', async function() {
      const result = await page.evaluate(() => {
        return strictPriceCheck('1.50');
      });

      expect(result).not.toBe('match');       
  });

  it('should not return `match` when `1.00` is passed in as an argument to `strictPriceCheck`', async function() {
      const result = await page.evaluate(() => {
        return strictPriceCheck(1.00);
      });

      expect(result).not.toBe('match');
  });
});

