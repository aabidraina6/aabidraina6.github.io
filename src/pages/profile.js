import React, { useState } from "react";
import { Table, Tr } from 'react-bootstrap';

export default function MyProfile({ user }) {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.bio}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
  