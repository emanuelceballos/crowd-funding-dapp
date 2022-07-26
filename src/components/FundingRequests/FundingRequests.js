
const FundingRequests = ({requestsList}) => {
    
    return (
        <div>
            <div className="text-center font-weight-bold m-4">
                Requests
            </div>

            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount requested</th>
                    <th scope="col">Completed</th>
                    <th scope="col"># of voters</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        requestsList.map((request, key) => {
                            return <tr key={key}>
                                <th scope="row">{request.id}</th>
                                <td>{request.description}</td>
                                <td>{request.amount}</td>
                                <td>{request.isCompleted}</td>
                                <td>{request.noOfVoters}</td>
                            </tr>
                        })
                    }
                    
                </tbody>
            </table>
        </div>
    );
}

export default FundingRequests;