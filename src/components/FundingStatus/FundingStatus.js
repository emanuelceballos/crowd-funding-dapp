const FundingStatus = ({manager, fundingTarget, deadline, minimumContribution, amountRaised, donateHandler}) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        
        if(amount === "" || amount === "0") {
            alert("Please enter a value higher than 0");
            return false;
        }

        donateHandler(e, amount);
    }

    return(
        <div>
            <div className="text-center">
                <form className="form-inline mt-4">
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="amount" className="sr-only">Amount</label>
                        <input type="number" className="form-control" id="amount" placeholder="Amount in wei" />
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" onClick={handleSubmit}>Donate now!</button>
                </form>
            </div>

            <div className="alert alert-warning mt-4" role="alert">
                Funding Manager: {manager}
            </div>

            <div className="text-center font-weight-bold m-4">
                Funding Status
            </div>

            <div className="card-deck">
                <div className="card bg-info mb-3" style={{ maxWidth: "18rem" }}>
                    <div className="card-header">Funding Target</div>
                    <div className="card-body">
                    <h5 className="card-title">{fundingTarget} wei</h5>
                    </div>
                </div>
                <div className="card text-white bg-danger mb-3" style={{ maxWidth: "18rem" }}>
                    <div className="card-header">Deadline</div>
                    <div className="card-body">
                    <h5 className="card-title">{deadline}</h5>
                    </div>
                </div>
                <div className="card bg-info mb-3" style={{ maxWidth: "18rem" }}>
                    <div className="card-header">Minimum Contribution</div>
                    <div className="card-body">
                    <h5 className="card-title">{minimumContribution} wei</h5>
                    </div>
                </div>
                <div className="card text-white bg-success mb-3" style={{ maxWidth: "18rem" }}>
                    <div className="card-header">Amount Raised So Far</div>
                    <div className="card-body">
                    <h5 className="card-title">{amountRaised} wei</h5>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default FundingStatus;