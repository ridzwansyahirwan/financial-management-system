const Popup = ({ isOpen, closeModal }) => {
    return (
        <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <p>This is a popup/modal!</p>
            </div>
        </div>
    );
};

export default Popup;