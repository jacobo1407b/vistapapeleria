import React from "react";
import { Header, Image, Modal, Icon, Grid } from "semantic-ui-react";

const ModalBasic = (props) => {
  const { show, setShow, title, children, envia, im } = props;
  const onClose = () => {
    if (envia) {
      return false;
    } else {
      setShow(false);
    }
  };
  return (
    <div>
      <Grid>
        <Modal open={show} closeOnEscape={false} closeOnDimmerClick={true}>
          <Modal.Header>
            {title} <Icon name="close" onClick={onClose} link />
          </Modal.Header>
          <Modal.Content image={im ? true : false}>
            {im ? <Image size="medium" src={im} wrapped /> : null}
            {im ? (
              <Modal.Description>
                <Header>{title}</Header>
              </Modal.Description>
            ) : null}
            {children}
          </Modal.Content>
        </Modal>
      </Grid>
    </div>
  );
};

export default ModalBasic;

/**
 * <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='/images/avatar/large/rachel.png' wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
 */
