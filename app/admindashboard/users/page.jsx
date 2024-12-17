"use client";
import React, { useState, useEffect } from 'react';
import { DataTable } from '../payments/data-table';
import { columns } from './columns'; // Assuming your columns are defined here

async function getUsers() {
  const response = await fetch('../../api/backofficeUser');
  const data = await response.json();
  return data.users;
}

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users Page</h1>
      <div className="container mx-auto py-10">
        {/* Pass the columns, fetched users data, and the setUsers function to DataTable */}
        <DataTable columns={columns} data={users} functions={setUsers} />
      </div>
    </div>
  );
}
