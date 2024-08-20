import {ethers} from 'ethers';

const provider = new ethers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);

export { provider, ethers };
