module.exports = {
  'A message is shown when there is no credentials supplied to the signup form': (browser) => {
    browser
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#signup-body', 2000)
      .waitForElementVisible('.signup-form', 1000)
      .setValue('input[name=username]', 'james')
      .click('#signup-button')
      .pause(2000)
      .waitForElementVisible('.help-block', 5000)
      .pause(1000)
      .end();
  }
};
