const fs = require("fs").promises;
const url = "https://www.jumbo.cl/";
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// Retrieve the login credentials from .env file
require("dotenv").config();

// Setup Puppeteer with stealth plugin and launch a new browser instance
const setupPuppeteer = async () => {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized", "--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  return { browser, page };
};

// Authenticate the user with the given email and password
const authenticate = async (driver, email, password) => {
  const buttonElement = await driver.waitForXPath(
    "//button[@class='primary-btn login-btn'][@aria-label='Ingresa']"
  );
  await buttonElement.click();
  const emailInputElement = await driver.$(
    'input.input-default[name="email"][autocomplete="username"]'
  );
  await emailInputElement.type(email);
  const passwordInputElement = await driver.$(
    'input.input-default[name="Clave"][autocomplete="current-password"][type="password"]'
  );
  await passwordInputElement.type(password);
  const loginButtonElemtn = await driver.waitForXPath(
    "//button[@class='primary-btn' and @type='submit']/span[@class='btn-span-enter' and text()='Ingresa']"
  );
  await loginButtonElemtn.click();
  console.log("Authenticated");
};

// Save cookies to a local file
const saveCookies = async (driver) => {
  await driver.waitForTimeout(5000);
  await driver.screenshot({ path: "./output/auth-test.png", fullPage: false });
  const cookies = await driver.cookies();
  const cookieJson = JSON.stringify(cookies, null, 2);
  await fs.writeFile("./output/cookies.json", cookieJson);
  console.log("Saved cookies to local file.");
};

// Main function to save login credentials and cookies
const saveLoginCredentials = async (email, password) => {
  const { browser, page } = await setupPuppeteer();
  await page.goto(url);
  await authenticate(page, email, password);
  await saveCookies(page);
  await browser.close();
};

// Read email and password from the .env file
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

// Run the script with the credentials from the .env file
saveLoginCredentials(email, password);
