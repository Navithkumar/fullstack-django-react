import './table.css';

function Table({
    headers,
    data,
    pagination,
    handleEdit = () => {},
    handleDelete = () => {},
    edit,
    viewAddress = () => {},
}) {
    return (
        <div className="container mt-4">
            <h3 className="mb-4">User Listing</h3>
            {data.length > 0 ? (
                <table className="table table-bordered table-hover custom-table">
                    <thead className="table-dark">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.username}</td>
                                <td>{value.email}</td>
                                <td>
                                    {value.role == 2 ? 'Customer' : 'Seller'}
                                </td>
                                {edit == true ? (
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => handleEdit(value)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(value)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                ) : (
                                    <td>
                                        <button
                                            className="btn btn-sm btn-info text-white"
                                            title="View Details"
                                            onClick={() =>
                                                viewAddress(value.address)
                                            }
                                        >
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info">No records found</div>
            )}
        </div>
    );
}

export default Table;
