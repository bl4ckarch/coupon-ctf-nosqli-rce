import React, { useState } from 'react';

export default function CheckState() {
  const [host, setHost] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('/admin/check-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host }),
      });
      
      const data = await response.text();
      setResult(data);
    } catch (err) {
      setResult('Error checking host state');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Check State</h1>
      
      <div className="max-w-2xl bg-[#1f1f1f] rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="host" className="block text-sm font-medium text-gray-200 mb-1">
              Host to check
            </label>
            <input
              type="text"
              id="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter hostname or IP"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check State'}
          </button>
        </form>
        
        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <pre className="bg-[#2a2a2a] p-4 rounded overflow-x-auto">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}