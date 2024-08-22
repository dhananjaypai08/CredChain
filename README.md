# CredChain
  - Decentralized protocol for helping users upskill in the right direction

## Demo Link:
[https://www.youtube.com/watch?v=reynJr34Qrw](https://www.youtube.com/watch?v=reynJr34Qrw)

## Setup
- Clone the repo
- `cd CredChain`
- `npm run start`
- create and activate python virtual environment using venv module
- `cd lucas`
- `pip instal -r requirements.txt`
- configure your .env in lucas/ by looking at the .env.example file
- `python main.py`
Done!

## Aim

To enable individuals to build their own reputation onchain and also help hiring managers to shortlist or select candidates via the EIP5192 Tokens.

## Bone of contention and current Solution

  - Unlike traditional certification methods vulnerable to forgery, 
CredChain operates on the secure blockchain, functioning like an on-chain LinkedIn. 
  - CredChain introduces three core features: first, Soul Bound Tokens (SBT) are tamper-proof and issued by whitelisted organizations. 
  - Utilizing multi-batch processing, we streamline transactions, reducing gas fees. 
  - CredChain tokens are EIP 5192 compatible, ensuring they can't be transferred after minting. 
  - The second feature introduces a peer-driven endorsement system, allowing users to endorse others based on their CredChain holdings. 
  - The third feature is a dynamic reputation score, providing a reliable proof of individual proficiency. This not only streamlines hiring but also encourages continuous professional growth in the job market.
  - Our platform safeguards verified skills and fosters a competitive environment for ongoing skill development.

## How it works
  - Organization can send ERC5192 compatible tokens to peers wallet address
  - whitelisted Organization's can perform single mint by adding metadata or Bulk minting which supports multi batch transaction by just importing a .csv file.
  - Users who hold the CredChain, also access the reputation score so as to attain visibility and helps give an edge in the job market.
  - Hiring managers can view the portfolio of individual users by entering the wallet address or just look at the reputation score of every account that has CredChain in their account and gain a deeper insight on that particular user


## Built Using  
  - Solidity
  - Openzeppelin
  - Remix IDE
  - Lighthouse.storage
  - Metamask EOA
  - IPFS storage
  - ReactJS
  - Ethers
  - Hardhat
  -Chainlink
