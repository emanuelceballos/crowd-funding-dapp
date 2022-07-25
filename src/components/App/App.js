import FundingRequests from '../FundingRequests/FundingRequests';
import './App.css';
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import CrowdFundingJson from '../../artifacts/contracts/CrowdFunding.json';
import { fromWei, toWei } from 'web3-utils';
import FundingStatus from '../FundingStatus/FundingStatus';
import Donators from '../Donators/Donators';

const App = () => {

    const [fundingRequests, setFundingRequests] = useState([]);
    const [manager, setManager] = useState(null);
    const [fundingTarget, setFundingTarget] = useState(0);
    const [deadline, setDeadline] = useState(0);
    const [minimumContribution, setMinimumContribution] = useState(0);
    const [amountRaised, setAmountRaised] = useState(0);
    const [crowdFundingContract, setCrowdFundingContract] = useState(null);
    const [donators, setDonators] = useState([]);
    
    const donateHandler = async (e, amountInWei) => {
        e.preventDefault();

        // Create a transaction object
        let tx = {
            value: amountInWei
        }

        const succes = await crowdFundingContract.functions
            .SendEth(tx)
            .then(tx => {
                return true;
            })
            .catch(err => {
                alert(err.data.message);
                return false;
            });

        if(succes) {
            alert('Thank you for donating!');
        }
    }

    useEffect(() => {
        const connectToWeb3 = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            provider.send("eth_requestAccounts", []);
            
            const { chainId } = await provider.getNetwork()
            const networkId = chainId;
    
            const crowdFundingInfo = CrowdFundingJson.networks[networkId];

            getFundingInformation(signer, crowdFundingInfo, CrowdFundingJson);
        };

        const getFundingInformation = async (signer, crowdFundingInfo, CrowdFundingJson) => {
            const cfContract = new ethers.Contract(crowdFundingInfo.address, CrowdFundingJson.abi, signer);
            setCrowdFundingContract(cfContract);

            const mgr = await cfContract.functions.Manager();
            setManager(mgr);

            const target = await cfContract.functions.target();
            setFundingTarget(toWei(target.toString(), 'wei'));

            const minContribution = await cfContract.functions.minContribution();
            setMinimumContribution(toWei(minContribution.toString(), 'wei'));

            const raised = await cfContract.functions.raiseAmount();
            setAmountRaised(toWei(raised.toString(), 'wei'));
            
            const dline = await cfContract.functions.deadline();
            const epochDeadline = parseFloat(fromWei(dline.toString())) * 10**18;
            var epoch = new Date(0); // Sets the date to the epoch
            epoch.setUTCSeconds(epochDeadline);
            const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            setDeadline(epoch.toLocaleDateString('en-US', dateOptions));

            const totalRequests = await cfContract.functions.numberOfRequests();
            const jsTotalRequests = parseInt(fromWei(totalRequests.toString()));

            for (let i = 0; i < jsTotalRequests; i++) {
                const fundingRequest = cfContract.functions.requests(i);
                setFundingRequests([...fundingRequests, fundingRequest]);
            }

            const eventFilter = cfContract.filters.EthReceived();
            const events = await cfContract.queryFilter(eventFilter);
            
            const dntrs = events.map((e, key) => {
                const {args} = e;
                return {
                    key,
                    address: args._from,
                    amount: toWei(args._value.toString(), 'wei')
                };
            });

            // Most recents at the top
            setDonators(dntrs.reverse());
        }

        connectToWeb3();
    }, [fundingRequests]);

    return (
        <div className='container'>
            <FundingStatus
                manager={manager}
                fundingTarget={fundingTarget}
                deadline={deadline}
                minimumContribution={minimumContribution}
                amountRaised={amountRaised}
                donateHandler={donateHandler} />
            
            <div className="row">
                <div className="col-6">
                    <FundingRequests requestsList={[]} />
                </div>
                <div className="col">
                    <Donators donators={donators} />
                </div>
            </div>
        </div>
    );
}

export default App;
