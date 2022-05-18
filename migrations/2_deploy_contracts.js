const IOU = artifacts.require('./IOU.sol');
const ERC721PresetMinterPauserAutoId = artifacts.require(
  './ERC721PresetMinterPauserAutoId.sol'
);
const Nft_init = artifacts.require('./Nft_init.sol');

// const ERC721Enumerable = artifacts.require(
//   '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol'
// );
// const ERC721Burnable = artifacts.require(
//   '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol'
// );
// const ERC721Pausable = artifacts.require(
//   '@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol'
// );

// DEPLOY THESE
// ERC721Enumerable,
// ERC721Burnable,
// ERC721Pausable

module.exports = function (deployer) {
  deployer.deploy(IOU);
  // deployer.deploy(ERC721Enumerable);
  // deployer.deploy(ERC721Burnable);
  // deployer.deploy(ERC721Pausable);
  deployer.deploy(
    ERC721PresetMinterPauserAutoId,
    'The IOU NFT',
    'INFT',
    'https://localhost:3000'
  );
  deployer.deploy(Nft_init);
};
