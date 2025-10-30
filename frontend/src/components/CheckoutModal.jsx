function CheckoutModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>🧾 Order Receipt</h2>
        <p><strong>Name:</strong> {receipt.name}</p>
        <p><strong>Email:</strong> {receipt.email}</p>
        <p><strong>Total:</strong> ₹{receipt.total}</p>
        <p><strong>Time:</strong> {receipt.timestamp}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CheckoutModal;
