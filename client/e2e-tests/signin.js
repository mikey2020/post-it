module.exports = {
  'Shows `error message` when user tries to sign in with invalid username': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .waitForElementVisible('#login-button', 2000)
      .click('#login-button')
      .pause(1000)
      .waitForElementVisible('#modal1', 2000)
      .setValue('input[name=username]', 'james')
      .click('.signin-form h3')
      .pause(3000)
      .waitForElementVisible('.help-block', 5000)
      .end();
  },
  'User gets success flash Message when sign in is successful': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#login-button', 2000)
      .click('#login-button')
      .waitForElementVisible('#modal1', 2000)
      .setValue('input[name=username]', 'johnny')
      .setValue('input[name=password]', 'johnson')
      .pause(2000)
      .click('#sign-in')
      .waitForElementVisible('.vertical-menu', 5000)
      .waitForElementVisible('.sidebar-header', 4000)
      .end();
  },
  'Shows `alert error box` when user tries to sign in with invalid credentials': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .click('#login-button')
      .waitForElementVisible('#modal1', 2000)
      .setValue('input[name=username]', 'flash')
      .setValue('input[name=password]', 'flash')
      .pause(2000)
      .click('#sign-in')
      .waitForElementVisible('.alert', 5000)
      .end();
  },
};
