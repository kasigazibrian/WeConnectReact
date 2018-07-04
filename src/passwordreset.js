import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Col } from 'reactstrap';

class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.togglePasswordResetModal = this.togglePasswordResetModal.bind(this);
    }

    togglePasswordResetModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.togglePasswordResetModal}>{this.props.buttonLabel}</Button>
                <Form>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.togglePasswordResetModal}>Reset Password</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Col sm={"12"}>
                                <label> You are trying to reset your password. If you CANCEL, your password will not be changed.</label>
                            </Col>
                        </FormGroup>
                            <FormGroup >
                                <Col sm={"6"}>
                                    <label id="first-name" >New Password:</label>
                                    <input onChange={this.handlePasswordChange} type="password" id="first_name"
                                           style={{borderRadius: "20px"}} className="form-control" required="true">

                                    </input>
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Col sm={"6"}>
                                    <label id="first-name"  >Confirm Password:</label>
                                    <input onChange={this.handleConfirmPasswordChange} type="password" id="first_name"
                                           style={{borderRadius: "20px"}} className="form-control" required="true">

                                    </input>
                                </Col>
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter>

                        <Button color="primary" onClick={this.togglePasswordResetModal}>Reset Password</Button>
                        <Button color="secondary" onClick={this.togglePasswordResetModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                </Form>
            </div>
        );
    }
}

export default PasswordReset;
