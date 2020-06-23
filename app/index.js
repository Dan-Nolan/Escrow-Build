import Escrow from './artifacts/Escrow';
import { address } from './artifacts/Meta';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(web3.currentProvider);

async function getInfo() {
    const address = "0x7eC1225076e4ea595EaAae95A38dAE7820057cd1";

    try {
        const contract = new ethers.Contract(address, Escrow.abi, provider);
        const arbiter = await contract.arbiter();
        const beneficiary = await contract.beneficiary();
        const depositor = await contract.depositor();
        const isApproved = await contract.isApproved();

        document.getElementById("info").innerHTML = `
            <div>
              Found the <strong>Escrow Contract!</strong>
            </div>
            <div>
              The Arbiter address is <strong>${arbiter}</strong>
            </div>
            <div>
              The beneficiary address is <strong>${beneficiary}</strong>
            </div>
            <div>
              The Depositor address is <strong>${depositor}</strong>
            </div>
            <div>
              It is currently <strong>${isApproved ? 'approved' : 'not approved'}</strong>.
            </div>
        `;
    }
    catch(ex) {
        document.getElementById("info").innerHTML = `
            <div>
              Unable to find the contract! Are you connected to the right network?
            </div>
            <div>
              Got this exception: <strong> ${ex.toString()} </strong>
            </div>
        `;
    }
}

getInfo();
