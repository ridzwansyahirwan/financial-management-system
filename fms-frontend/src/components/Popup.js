const Popup = ({ isOpen, closeModal }) => {
    // Modal JSX code here
    return (
        <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <p>This is a popup/modal!</p>
                {/* Add your content here */}
            </div>
        </div>
    );
};

export default Popup;