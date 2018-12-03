const puppeteer = require('puppeteer');

const runService = async (username, password) => {

    // Puppeteer launch configuration
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const url = 'https://www.wizink.es/home';
    const navigationPromise = page.waitForNavigation()

    await page.setViewport({
        width: 916,
        height: 940
    })

    await page.goto(url);

    // Steps to access bank dashboard
    //  1. Access main page
    //  2. Press sign in button wait for redirection with token
    //  3. Login 

    await page.waitForSelector('.homepage > .canvas > #main > .navbarsuperior > #home-side-menu-link')
    await page.click('.homepage > .canvas > #main > .navbarsuperior > #home-side-menu-link')

    await page.waitForSelector('.homepage > .navbarlateral > .nav > li:nth-child(8) > a')
    await page.click('.homepage > .navbarlateral > .nav > li:nth-child(8) > a')

    await navigationPromise

    await page.waitForSelector('.row > #formlogin > .c-login > #contentUser > #user-userName')
    await page.click('.row > #formlogin > .c-login > #contentUser > #user-userName')
    await page.type('.row > #formlogin > .c-login > #contentUser > #user-userName', `${username}`)

    await page.waitForSelector('.layout--right > .row > #newUserRegisterForm > .row > .c-register')
    await page.click('.layout--right > .row > #newUserRegisterForm > .row > .c-register')

    await page.waitForSelector('.row > #formlogin > .c-login > #contentPass > #password')
    await page.click('.row > #formlogin > .c-login > #contentPass > #password')
    await page.type('.row > #formlogin > .c-login > #contentPass > #password', `${password}`)
    await page.waitForSelector('.layout--left > .row > #formlogin > .c-login > #btnLogin')
    await page.click('.layout--left > .row > #formlogin > .c-login > #btnLogin')
    await navigationPromise
    await navigationPromise

    // Steps to get account balance
    //  1. Wait for selector in balance page
    //  2. Get inner Text of page and extract values using utils function 

    await page.waitForSelector(".c-account__summary");

    const element = await page.$(".balance-available");
    const text = await page.evaluate(element => element.textContent, element);
    await browser.close();

    // Simple parse page results
    const parsedText = async (txt) => {
        return txt.trim()
            .split(/\r?\n/).filter(Boolean);
    }

    const result = await parsedText(text);
    console.log(result);

    return Promise.resolve(result);
};

// Run Locally
module.exports.runService = runService;