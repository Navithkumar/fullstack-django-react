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
                                <td>{value.username || value.category_name}</td>
                                <td>
                                    {value.email ? (
                                        value.email
                                    ) : (
                                        <img
                                            src={`http://localhost:8000${value.category_image}`}
                                            alt="Category"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                </td>

                                <td>
                                    {value.role === 2
                                        ? 'Customer'
                                        : value.status === 1
                                        ? 'Pending'
                                        : value.status === 2
                                        ? 'Approved'
                                        : 'Declined'}
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
