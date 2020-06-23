const bre = require("@nomiclabs/buidler");

async function main() {
  const [depositor, arbiter, beneficiary] = await ethers.provider.listAccounts();
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(arbiter, beneficiary);

  await escrow.deployed();

  console.log("Escrow deployed to:", escrow.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
