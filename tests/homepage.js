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
      .url('http://localhost:8080/login')
      .waitForElementVisible('body', 5000)
      .click('.btn-login')
      .setValue('input[name=email]', 'anthony@andela.com')
      .setValue('input[name=password]', 'anthony')
      .click('.btn-login')
      .waitForElementVisible('div[id="dashboardBG"]', 5000)
      .assert.containsText('h4', 'DASHBOARD')
      .assert.urlEquals(`${'http://localhost:8080/'}`)
      .end();
  },
};
