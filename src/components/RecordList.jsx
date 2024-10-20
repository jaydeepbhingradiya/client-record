import React from "react";

const RecordList = ({ records, onEdit, onDelete }) => {
  return (
    <div className="records">
      {records.map((record) => (
        <div key={record.id} className="record">
          <span>
            {record.id} - {record.name} - {record.email}
          </span>
          <button
            onClick={() =>
              onEdit(record.id, {
                ...record,
                email: prompt("Enter new email:", record.email),
              })
            }
          >
            Edit
          </button>
          <button onClick={() => onDelete(record.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RecordList;
