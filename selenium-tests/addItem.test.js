const { Builder, By, until } = require('selenium-webdriver');

(async function addItemTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3000'); // Adjust if your frontend runs on a different port
    await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);
    const input = await driver.findElement(By.css('input[type="text"]'));
    await input.sendKeys('Test Task');
    const addButton = await driver.findElement(By.css('button'));
    await addButton.click();
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Test Task')]")), 5000);
    console.log('Add Item Test Passed');
  } catch (err) {
    console.error('Add Item Test Failed:', err);
  } finally {
    await driver.quit();
  }
})();
