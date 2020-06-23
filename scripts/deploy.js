const bre = require("@nomiclabs/buidler");
const fs = require('fs');
const path = require('path');
const ARTIFACTS_DIR = path.join(".", "app", "artifacts");
const CONTRACT_ARTIFACT = 'Meta.json';
const CONTRACT_ARTIFACT_PATH = path.join(ARTIFACTS_DIR, CONTRACT_ARTIFACT);

async function main() {
  const [depositor, arbiter, beneficiary] = await ethers.provider.listAccounts();
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(arbiter, beneficiary);

  await escrow.deployed();

  // add escrow address to artifacts!
  fs.writeFileSync(
    CONTRACT_ARTIFACT_PATH,
    JSON.stringify({ address: escrow.address })
  );

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
