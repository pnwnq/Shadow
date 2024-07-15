import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  modal: {
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  close: {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
  },
};

function Modal({ message, onClose }) {
  console.log('Modal message:', message);

  return (
    <div
      style={styles.modal}
      role="button"
      tabIndex={0}
      onKeyPress={onClose}
      onClick={onClose}
    >
      <div style={styles.modalContent}>
        <span
          style={styles.close}
          role="button"
          tabIndex={0}
          onKeyPress={onClose}
          onClick={onClose}
        >
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
