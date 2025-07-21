import { Modal } from 'react-bootstrap';

const AddressModal = ({ show, onHide, address }) => {
    if (!address) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Address Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-2">
                    <div className="mb-2">
                        <strong>Street:</strong> {address.street}
                    </div>
                    <div className="mb-2">
                        <strong>City:</strong> {address.city}
                    </div>
                    <div className="mb-2">
                        <strong>State:</strong> {address.state}
                    </div>
                    <div className="mb-2">
                        <strong>Postal Code:</strong> {address.postal_code}
                    </div>
                    <div className="mb-2">
                        <strong>Country:</strong> {address.country}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AddressModal;
