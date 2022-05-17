const { assert } = require("chai");

const IOU = artifacts.require("./IOU.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract("IOU", accounts => {
  it("Test Initializer", async () => {
    assert(true, true)
  });
});
