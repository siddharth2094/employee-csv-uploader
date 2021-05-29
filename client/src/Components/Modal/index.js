import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

class DefaultModal extends React.Component {
  toggleModal = () => {
    this.props.toggle(!this.props.isOpen);
  };

  confirm = (e) => {
    e.preventDefault();
    this.props.confirm();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggleModal}
        className="modal-dialog-centered"
      >
        <Form onSubmit={this.confirm}>
          <ModalHeader toggle={this.toggleModal}>
            {this.props.modalTitle}
          </ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
          <ModalFooter>
            {!this.props.noSubmit && (
              <Button color="success" type="submit">
                {this.props.buttonText ? this.props.buttonText : "Yes"}
              </Button>
            )}{" "}
            <Button onClick={this.toggleModal} color="danger" type="button">
              {this.props.cancelText ? this.props.cancelText : "Cancel"}
            </Button>{" "}
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default DefaultModal;
