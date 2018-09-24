# add to print out rate object ok, still need more work on extracting product names, e.g. 30 year fixed ...etc.

'use strict';

const puppeteer = require('puppeteer');
const screenshot = 'Wells Fargo Mortgage Calculator.png';
const viewPort = {
    width: 1280,
    height: 1800
};

(async() => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage();
  await page.setViewport(viewPort)

  await page.goto('https://www.wellsfargo.com/mortgage/rates/calculator/');

  // wait for #homevalue 
  await page.waitForSelector('#homeValue');
  
  // Type into search box.
  await page.type('#homeValue', '799000');
  await page.type('#downPayment', '200000');
  await page.select('#creditScore', '780')
  await page.select('#propertyState', 'CA')
  await page.select('#propertyCounty', 'San Mateo')
  await page.click('.homeCalc > #RPC > #homeLendingCommand > .buttonBarWithoutGrad > #NID1_14_1_1_4_1_3_2_2')
  await page.waitFor(6000)

  const result = await page.evaluate(() => {

		let rate = document.querySelector('td:nth-child(2)').innerHTML;
//		let product = document.querySelector('th#hdr1').nodeValue;
//        let product = document.querySelector('hdr1').innerHTML ;
//        let rate = document.querySelector('#PurchaseRatesTable > tbody > tr:nth-child(2) > td:nth-child(2)').innerHTML ;
		return {
			rate
		}
//		console.log(product + " is " + rate)



    });
  console.log(result);
	
  await page.screenshot({
        path: screenshot
    })
  console.log('See screenshot: ' + screenshot)

  await browser.close()

})();
