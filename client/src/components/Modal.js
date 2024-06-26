import React from 'react';

const Modal = ({ message, onClose }) => {
  console.log('Modal message:', message); // 调试信息

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <span style={styles.close} onClick={onClose}>&times;</span>
        <p>{message}</p> {/* 确保这里正确显示message */}
      </div>
    </div>
  );
};

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
  }
};

export default Modal;
