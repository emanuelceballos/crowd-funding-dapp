import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CrowdFundingJson from '../../artifacts/contracts/CrowdFunding.json';

const NewRequest = () => {
    
    const [crowdFundingContract, setCrowdFundingContract] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const description = data.get("description");
        const recipient = data.get("recipient");
        const amount = data.get("amount");
        
        await crowdFundingContract.functions
            .MakeRequest(description, recipient, amount)
            .then(() => {

            })
            .catch(err => {
                alert(err.data.message);
            });
    }

    useEffect(() => {
        const connectToWeb3 = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            provider.send("eth_requestAccounts", []);
            
            const { chainId } = await provider.getNetwork()
            const networkId = chainId;
    
            const crowdFundingInfo = CrowdFundingJson.networks[networkId];
            const cfContract = new ethers.Contract(crowdFundingInfo.address, CrowdFundingJson.abi, signer);
            setCrowdFundingContract(cfContract);
        };

        connectToWeb3();
    }, [])

    return(
        <div className="container">

            <div className="text-center font-weight-bold m-4">
                Create new Request for funding
            </div>

            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-2 col-form-label">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="description" name="description" placeholder="Description" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="recipient" className="col-sm-2 col-form-label">
                        Recipient
                    </label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="recipient" name="recipient" placeholder="Recipient" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-2 col-form-label">
                        Amount
                    </label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="amount" name="amount" placeholder="Amount" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 col text-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewRequest;