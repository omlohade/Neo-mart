import React from 'react';
import './BillDetails.css'; 

function BillDetails({ totalBill, address }) {
  return (
    <div className="bill-details-container">
      <h2 className="bill-details-header">Bill Details</h2>
      <div className="bill-details-content">
        <div className="bill-detail">
          <p className="bill-detail-label">Total Bill:</p>
          <p className="bill-detail-value">Rs. {totalBill}</p>
        </div>
        <div className="bill-detail">
          <p className="bill-detail-label">Payment Type:</p>
          <p className="bill-detail-value">COD</p>
        </div>
        <div className="bill-detail">
          <p className="bill-detail-label">Address:</p>
          <p className="bill-detail-value">{address}</p>
        </div>
      </div>
    </div>
  );
}

export default BillDetails;
