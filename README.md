# Description
An agree now and pay in full later system which will allow the purchasing party time to move funds as well as allowing the seller to keep the asset until these funds are fully available. There will be an "earnest money" portion where the buyer will have to stake a certain percentage of the final agreed upon price that will be used to cover the full purchase price or will cover a penalty fee for cancelling the bid to the seller and a fee to IOU itself. The rest of the earnest money minus gas and fees will be paid back to the buyer. This agreement will be between two addresses and the execution for processing will have to be agreed upon by seller at time of listing and buyer at time of bidding. This process will allow for the potential of even higher final prices for sellers that may or may not be dependent on the buyer securing financing to complete payment. In addition that also means the buyer will have the ability to acquire digital assets on a right of first refusal basis. We believe this will allow for greater flexibility to both parties involved in the sale/transfer.

# Watch
https://www.youtube.com/watch?v=q8CyjjkMpQQ

# How it's made
This project was developed on a local ganache server for ease of access and inspection in a timely fashion while troubleshooting. The front end was completed by implementing React.js and our global state management was completed by using the useContext hook. We incorporated a Web3 modal that allows our users to sign in with their favorite wallet authenticator with three options currently supported. The options we currently have are WalletConnect MetaMask and CoinbaseWallet. The authentication and connection of WalletConnect itself provides for increased support via their api. We really impressed ourselves by building this from the ground up and not using boilerplate other than create react app and truffle init. There is a hack to do with node_modules that we intend to fix with assistance of the team over at IPFS. Additional information of project dependencies and technology can be found on our GitHub Please look at the package.json's for project dependencies. As we know in the software industry we must remind ourselves of the immortal words of Colonel Graff from Enders Game, "You're never ready, you go when you're ready enough." Thus our projects submission will still need work in the future. To that end, going forward we would like to improve functionality backend to frontend and test our contract to a fuller extent prior to deployment on main-net. We would also like to provide the ability for users to sell NFT's using the IOU process from NFT's minted from other marketplaces.

# Technology 
- React, React-Bootstrap
- Ehthereum
- Solidity
- IPFS
- NFT.storage
- WalletConnect
- Development: Truffle Suite & Ganache
