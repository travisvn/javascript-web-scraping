const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="ebooksImgBlkFront"]');
  const src = await el.getProperty('src');
  const imgURL = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="productTitle"]/text()');
  const txt = await el2.getProperty('textContent');
  const title = await txt.jsonValue();

  const [el3] = await page.$x('//*[@id="buybox"]/div/table/tbody/tr[1]/td[2]');
  const txt2 = await el3.getProperty('textContent');
  const price = await txt2.jsonValue();

  console.log({ imgURL, title, price });

  browser.close();
}

scrapeProduct(
  'https://www.amazon.com/Black-Swan-Second-Improbable-Incerto-ebook/dp/B00139XTG4/ref=sr_1_2?dchild=1&keywords=black+swan&qid=1591410343&sr=8-2'
);
