import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Library(){
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'a', label: 'Category A' },
    { id: 'b', label: 'Category B' },
    { id: 'c', label: 'Category C' },
    { id: 'd', label: 'Category D' }
  ];

  useEffect(()=>{ API.get('/books').then(r=>setBooks(r.data)).catch(()=>{}); },[]);
  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.categories?.includes(selectedCategory));

  return (
    <div>
      <h2>Library</h2>
      
      {/* Filter Categories */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Filter by Category:</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                background: selectedCategory === category.id ? '#007bff' : '#e9ecef',
                color: selectedCategory === category.id ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {filteredBooks.map(b => (
          <div key={b._id} style={{ padding:12, border:'1px solid #ddd' }}>
            <h4>{b.title}</h4>
            <div style={{ fontSize:12, color:'#666' }}>
              <div>Authors: {(b.authors||[]).join(', ') || 'Unknown'}</div>
              <div>Size: {b.size ? (b.size/1024).toFixed(1) + ' KB' : '—'}</div>
            </div>
            <p>{(b.description||'').slice(0,120)}</p>
            <div style={{ display:'flex', gap:8 }}>
              <Link to={`/pdf/${b._id}`}>Details</Link>
              <a href="#" onClick={async e => { e.preventDefault(); const res=await API.get(`/books/${b._id}/presign`); window.open(res.data.url); }}>Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
