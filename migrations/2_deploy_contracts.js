const IOU = artifacts.require("./IOU.sol");
const ERC721PresetMinterPauserAutoId = artifacts.require(
  './ERC721PresetMinterPauserAutoId.sol'
);
const Nft_init = artifacts.require('./Nft_init.sol');

module.exports = function (deployer) {
  deployer.deploy(IOU);
  deployer.deploy(ERC721PresetMinterPauserAutoId);
  deployer.deploy(Nft_init);
}
