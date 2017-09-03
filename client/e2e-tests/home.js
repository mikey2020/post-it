module.exports = {
  'User should be able to create a group and add user to the group': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#login-button', 2000)
      .click('#login-button')
      .waitForElementVisible('#modal1', 3000)
      .setValue('input[name=username]', 'johnny')
      .setValue('input[name=password]', 'johnson')
      .pause(2000)
      .click('#sign-in')
      .waitForElementVisible('.vertical-menu', 5000)
      .waitForElementVisible('.sidebar-header', 4000)
      .waitForElementVisible('#logout-button', 2000)
      .waitForElementVisible('.add_box', 2000)
      .click('.add_box')
      .waitForElementVisible('#modal2', 2000)
      .waitForElementVisible('#create-group-button', 2000)
      .setValue('input[name=name]', 'konoha')
      .waitForElementVisible('#create-group-button', 2000)
      .click('#create-group-button')
      .waitForElementVisible('.sidebar-header', 2000)
      .waitForElementVisible('.group-btn', 2000)
      .assert.containsText('.group-btn', 'Konoha')
      .click('.group-btn')
      .pause(3000)
      .waitForElementVisible('.right-column-header', 2000)
      .click('.adduser-icon')
      .waitForElementVisible('.adduserpage', 2000)
      .waitForElementVisible('#username', 2000)
      .setValue('#username', 'john')
      .pause(3000)
      .waitForElementVisible('.collection-item', 2000)
      .assert.containsText('.user-btn', 'john')
      .waitForElementVisible('.add-user-btn', 2000)
      .click('.add-user-btn')
      .end();
  },

  'User sees a logout button when he signs in successfully and able to signout': (browser) => {
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
      .waitForElementVisible('#logout-button', 2000)
      .click('#logout-button')
      .waitForElementVisible('.alert', 2000)
      .end();
  },


  'User should be see the message they posted to a group immediately after posting it': (browser) => {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('#login-button', 2000)
      .click('#login-button')
      .waitForElementVisible('#modal1', 3000)
      .setValue('input[name=username]', 'johnny')
      .setValue('input[name=password]', 'johnson')
      .pause(2000)
      .click('#sign-in')
      .waitForElementVisible('.vertical-menu', 5000)
      .waitForElementVisible('.sidebar-header', 4000)
      .waitForElementVisible('#logout-button', 2000)
      .waitForElementVisible('.group-btn', 2000)
      .assert.containsText('.group-btn', 'Konoha')
      .click('.group-btn')
      .waitForElementVisible('input[name=message]', 2000)
      .waitForElementVisible('#priority-level', 3000)
      .setValue('input[name= message]', 'hello world')
      .setValue('input[name=priorityLevel]', '10')
      .setValue('#priority-level', '10')
      .pause(3000)
      .click('#post-message-button')
      .waitForElementVisible('.message', 3000)
      .assert.containsText('.message', 'hello world')
      .end();
  }
};
