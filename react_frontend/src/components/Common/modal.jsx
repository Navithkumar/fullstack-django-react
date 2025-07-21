import { Modal } from 'react-bootstrap';
import Form from './Form';

const Modal = ({ show, onClose, title = 'Edit', formProps = {} }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form {...formProps} />
            </Modal.Body>
        </Modal>
    );
};

export default ReusableModalForm;
