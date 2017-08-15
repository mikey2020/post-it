module.exports = {
  'User sign in without credentials': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#login-button', 2000)
      .click('#login-button')
      .waitForElementVisible('#modal1', 2000)
      .setValue('input[name=username]', '')
      .setValue('input[name=password]', '')
      .click('#sign-in')
      .waitForElementVisible('.help-block', 5000)
      .assert.containsText('.help-block', 'Username is required');
  },
  'User sign in with wrong email': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#login-button', 2000)
      .click('#login-button')
      .waitForElementVisible('#modal1', 2000)
      .setValue('input[name=username]', 'wrong username')
      .setValue('input[name=password]', 'wrong password')
      .click('#sign-in')
      .end();
      // .waitForElementVisible('.help-block', 5000)
      // .assert.containsText('.help-block', 'Username is required');
  },
  'User sign in success': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .click('#login-button')
      .setValue('input[name=email]', 'flash')
      .setValue('input[name=password]', 'flash')
      .click('#sign-in')
      // .waitForElementVisible('#logout-button', 5000)
      // .assert.urlEquals(`${'http://localhost:3000/home'}`)
      .end();
  },
};
