const { formatEther, parseEther } = ethers.utils;
const deposit = parseEther("1");
const { assert } = require("chai");

describe("Escrow", function () {
    let depositor;
    let arbiter;
    let beneficiary;
    beforeEach(async () => {
        [depositor, arbiter, beneficiary] = await ethers.provider.listAccounts();
        const Escrow = await ethers.getContractFactory("Escrow");
        contract = await Escrow.deploy(arbiter, beneficiary, {
            value: deposit
        });
        await contract.deployed();
    });

    it("should be funded", async () => {
        let balance = await ethers.provider.getBalance(contract.address);
        assert.equal(balance.toString(), deposit.toString());
    });

    it("should default the isApproved state to false", async () => {
        const isApproved = await contract.isApproved();
        assert(!isApproved, "Expected isApproved to be false!");
    });

    describe("after approval from the arbiter", () => {
        let before;
        let tx;
        beforeEach(async () => {
            before = await ethers.provider.getBalance(beneficiary);
            const signer = await ethers.provider.getSigner(arbiter);
            tx = await contract.connect(signer).approve();
        });

        it("should transfer balance to beneficiary", async () => {
            const after = await ethers.provider.getBalance(beneficiary);
            assert.equal(after.sub(before).toString(), deposit.toString());
        });

        it("should set the isApproved state to true", async () => {
            const isApproved = await contract.isApproved();
            assert(isApproved, "Expected isApproved to be true!");
        });
    });
});
