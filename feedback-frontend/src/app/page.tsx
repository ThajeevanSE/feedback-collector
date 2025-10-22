'use client';
import { useState, useEffect, FormEvent } from 'react';

type Feedback = { name: string; message: string };

export default function Home() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const fetchFeedbacks = async () => {
    const res = await fetch('http://localhost:5000/api/feedback');
    const data: Feedback[] = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    });
    setName('');
    setMessage('');
    fetchFeedbacks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Feedback Collector</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="Your Feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>

      <h2>All Feedbacks</h2>
      <ul>
        {feedbacks.map((f, i) => (
          <li key={i}>
            <strong>{f.name}</strong>: {f.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
