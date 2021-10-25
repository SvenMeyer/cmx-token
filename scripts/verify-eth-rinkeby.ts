import hre from "hardhat";
// We require the Hardhat Runtime Environment explicitly here. This is optional but useful for running the
// script in a standalone fashion through `node <script>`. When running the script with `hardhat run <script>`,
// you'll find the Hardhat Runtime Environment's members available in the global scope.
import { ethers, config } from "hardhat";

import { Contract } from "@ethersproject/contracts";
import { CommX__factory } from "../typechain";

// set cmx_address , then run this script ...
// $ MAINNET_PRIVATE_KEY=e15ffb5... npx hardhat run scripts/verify-eth.ts --network ethMain

type ChainIdNetwork = {
  [index: number]: string;
};

async function main(): Promise<void> {
  const currentNetwork = await ethers.provider.getNetwork();
  console.log({ currentNetwork });

  // const accounts = await hre.ethers.getSigners();
  // console.log("using account :", accounts[0].address);

  // const constructorArgs = ["CommX", "CMX"];

  //   const CommX: CommX__factory = await ethers.getContractFactory("CommX");

  //   const cmx: Contract = await CommX.deploy(constructorArgs[0], constructorArgs[1]);
  //   await cmx.deployed();

  const cmx_address = "0x14ebcab30E3E27587a09611F3D11A43ed224717B";

  console.log("CommX deployed to: ", cmx_address);

  /**
   * @notice wait a few blocks, then verify on etherscan
   * @dev only etherscan supported at this time
   *
   */
  /*
  const CONFIRMATION_BLOCKS_WAIT = 10; // actually ~1 minute or 5 blocks should be ok, but let's play it safe

  let deployBn = cmx.deployTransaction.blockNumber;
  console.log("deploy blocknumber   =", deployBn);

  let bn = await ethers.provider.getBlockNumber();
  console.log("current block number =", bn);

  if (deployBn === null || deployBn === undefined) deployBn = bn; // i.e. rinkeby does not give us a deployTransaction.blockNumber

  console.log("waiting " + CONFIRMATION_BLOCKS_WAIT + " blocks ...");

  // wait for a few blocks before trying to verify contract on Etherscan
  // const tx2 = await cmx.deployTransaction.wait(CONFIRMATION_BLOCKS_WAIT); // would be easy but no feedback while waiting
  while (bn - deployBn < CONFIRMATION_BLOCKS_WAIT) {
    console.log(bn + " - need to wait " + (deployBn + CONFIRMATION_BLOCKS_WAIT - bn) + " more blocks ...");
    await new Promise(f => setTimeout(f, 10000));
    bn = await ethers.provider.getBlockNumber();
  }

  */

  // try to verify contract
  if (process.env.ETHERSCAN_API_KEY !== undefined && process.env.ETHERSCAN_API_KEY.length == 34) {
    await hre.run("verify:verify", {
      address: cmx_address,
      constructorArguments: [],
    });
  } else {
    console.log("Can not verify contract on Etherscan - no ETHERSCAN_API_KEY");
  }
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
