const puppeteer = require('puppeteer');

const runService = async (username, password) => {
  
  // Puppeteer launch configuration
  const browser = await puppeteer.launch({
    headless: true,
    args:['--no-sandbox']
  });
  const page = await browser.newPage();
  const url = 'https://www.bancsabadell.com/cs/Satellite/SabAtl/';
  const navigationPromiseLogin = page.waitForNavigation()
  
  await page.goto(url);


  // Selectors for credentials input
  const usernameSelector = `#usuarioNoConectado > #formField > .bs-box-form__column > .bso-field > .bs-label > .bs-label-wrap > #input-placeholder`;
  const passwordSelector = `#usuarioNoConectado > #formField > .bs-box-form__column > .bso-field > .bs-label-generales > .bs-label-wrap > .bs-label-input`;

  // Steps to access bank dashboard
  //  1. Login
  //  2. Wait to see dashboard 

  // Focus on Username input field then type username 
  await page.click(`${usernameSelector}`);
  await page.type(`${usernameSelector}`, `${username}`);

  // Focus on Password input field then type password 
  await page.click(`${passwordSelector}`);
  await page.type(`${passwordSelector}`, `${password}`);

  // Click Login Button 
  await page.click('.GBS_Modulo_FA > #loginModule > form > #usuarioNoConectado > .bs-login')
  await navigationPromiseLogin;

  // Steps to get account balance
  //  1. Wait for selector in balance page
  //  2. Get inner Text of page and extract values using utils function 

  const element = await page.$(".bs-modulo-contenido-cuenta");
  const text = await page.evaluate(element => element.innerText, element);
  await browser.close();

  // Simple parse page results
  const parsedText = async (txt) => {
    return txt.trim()
      .split(/\r?\n/).filter(Boolean);
  }
  
  const result = await parsedText(text);
  console.log(result);
  return Promise.resolve(await result);
};

// Run Locally
module.exports.runService = runService;

