import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { isAdmin } from '../auth';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [state, setState] = useState('');
  const [commandOutput, setCommandOutput] = useState('');

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }

    fetch('/admin')
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, [navigate]);

  const handleStateCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/admin/check-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      });
      const data = await response.text();
      setCommandOutput(data);
    } catch (err) {
      console.error('Failed to check state:', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Check State</h3>
          <form onSubmit={handleStateCheck} className="space-y-4">
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state to check"
              className="w-full px-3 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Check State
            </button>
          </form>
          {commandOutput && (
            <pre className="mt-4 bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {commandOutput}
            </pre>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">User List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;