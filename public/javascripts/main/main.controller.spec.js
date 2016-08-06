// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
//
// chai.use(chaiAsPromised);
// var expect = chai.expect;

describe('Main page', function() {
  it('should say this text', function() {
    browser.get('http://localhost:3000/');
    expect(element(by.binding('main.text')).getText()).
      toEqual('this is some text from the main controller');
  });
});
