module.exports = {
  'Sign up test': (browser) => {
    browser
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 1000)
      .setValue('input[name=username]', 'nightwatch')
      .setValue('input[name=password]', 'nightwatch')
      .waitForElementVisible('.signup-form', 1000)
      .click('#signup-button')
      .pause(1000)
      .end();
  }
};
