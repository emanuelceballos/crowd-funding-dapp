
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
                    <th scope="col">Completed</th>
                    <th scope="col"># of voters</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        requestsList.map(request => {
                            return <tr>
                                <th scope="row">{request.id}</th>
                                <td>{request.description}</td>
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