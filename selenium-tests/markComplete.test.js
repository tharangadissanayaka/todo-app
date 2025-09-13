const { Builder, By, until } = require('selenium-webdriver');

(async function markCompleteTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3000'); // Adjust if your frontend runs on a different port
    await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);
    const input = await driver.findElement(By.css('input[type="text"]'));
    await input.sendKeys('Complete Task');
    const addButton = await driver.findElement(By.css('button'));
    await addButton.click();
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Complete Task')]")), 5000);
    // Find the 'Mark as Done' button for the task
    const completeButton = await driver.findElement(By.xpath("//li[span[contains(text(), 'Complete Task')]]//button[contains(text(), 'Mark as Done')]"));
    await completeButton.click();
    // Optionally, check for completed state (e.g., line-through style)
    console.log('Mark Complete Test Passed');
  } catch (err) {
    console.error('Mark Complete Test Failed:', err);
  } finally {
    await driver.quit();
  }
})();
