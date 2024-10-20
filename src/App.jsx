import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import RecordList from './components/RecordList';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      const uniqueData = removeDuplicatesByEmail(data);
      setRecords(prevRecords => mergeRecords(prevRecords, uniqueData));
      // Reset the page to 0 when new data is added
      setCurrentPage(0);
    };

    reader.readAsText(file);
  };

  const removeDuplicatesByEmail = (data) => {
    const seen = new Set();
    return data.filter(record => {
      if (seen.has(record.email)) return false;
      seen.add(record.email);
      return true;
    });
  };

  const mergeRecords = (prevRecords, newRecords) => {
    const emails = new Set(prevRecords.map(record => record.email));
    const merged = [...prevRecords];
    newRecords.forEach(record => {
      if (!emails.has(record.email)) {
        merged.push(record);
      }
    });
    return merged;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Reset the page to 0 when the search term is changed
    setCurrentPage(0);
  };

  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.id.toString().includes(searchTerm)
  );

  // Ensure the records are sliced for the current page only
  const offset = currentPage * itemsPerPage;
  const currentRecords = filteredRecords.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEdit = (id, updatedRecord) => {
    if (records.some(record => record.email === updatedRecord.email && record.id !== id)) {
      alert("Email must be unique!");
      return;
    }
    setRecords(records.map(record => (record.id === id ? updatedRecord : record)));
  };

  const handleDelete = (id) => {
    setRecords(records.filter(record => record.id !== id));
    // Reset pagination if the page might be invalid after deleting the last item on a page
    if (filteredRecords.length - 1 <= offset) {
      setCurrentPage(Math.max(0, currentPage - 1));
    }
  };

  return (
    <div className="App">
      <h1>Client Records Management</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <SearchBar onSearch={handleSearch} />
      <RecordList
        records={currentRecords}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        pageCount={Math.ceil(filteredRecords.length / itemsPerPage)}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default App;
