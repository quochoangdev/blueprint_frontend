import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalGroupRoleDelete(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title as={"h2"}>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body as={"div"}>
          Woohoo, are you sure to delete this Group - Role:
          <br />
          {`${props?.dataModel?.Group?.name} - ${props?.dataModel?.Role?.url}`}
        </Modal.Body>
        <Modal.Footer>
          <Button size="lg" variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button size="lg" variant="primary" onClick={props.handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalGroupRoleDelete;
