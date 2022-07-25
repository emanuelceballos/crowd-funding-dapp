
const Donators = ({donators}) => {
    return (
        <div>
            <div className="text-center font-weight-bold m-4">
                Donators
            </div>

            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th scope="col">Address</th>
                    <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        donators.map(request => {
                            return <tr key={request.key}>
                                <td>{request.address}</td>
                                <td>{request.amount}</td>
                            </tr>
                        })
                    }
                    
                </tbody>
            </table>
        </div>
    );
}

export default Donators;