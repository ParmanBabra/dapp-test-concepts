// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  // Tether
  const Tether = await ethers.getContractFactory("Tether");
  const tether = await Tether.deploy();

  await tether.deployed();

  console.log("Tether deployed to:", tether.address);

  // RWD
  const RWD = await ethers.getContractFactory("RWD");
  const rwd = await RWD.deploy();

  await rwd.deployed();

  console.log("RWD deployed to:", rwd.address);

  // DecentralBank
  const DecentralBank = await ethers.getContractFactory("DecentralBank");
  const decentralBank = await DecentralBank.deploy(tether.address, rwd.address);

  await decentralBank.deployed();

  const accounts = await ethers.getSigners();

  await rwd.transfer(decentralBank.address, ethers.utils.parseEther("1000000"));
  await tether.transfer(accounts[1].address, ethers.utils.parseEther("1000"));

  console.log("DecentralBank deployed to:", decentralBank.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
