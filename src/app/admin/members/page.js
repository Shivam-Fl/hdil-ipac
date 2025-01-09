"use client"
import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from '@/utils/axiosInstance'; // Import your axios instance

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    username: '',
    email: '',
    company: '',
    password: ''
  });

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('/auth/users');
      const filteredAccounts = res.data.filter(account => account.role !== 'admin'); // Filter out admin accounts
  
      // Fetch industries and map them by owner ID
      const industriesRes = await axios.get('/industries');
      const industries = industriesRes.data;
  
      const accountsWithIndustry = filteredAccounts.map(account => {
        const userIndustry = industries.find(industry => industry.owner === account._id); // Match owner ID with user ID
        return { ...account, industry: userIndustry };
      });
  
      setAccounts(accountsWithIndustry);
    } catch (error) {
      console.error('Failed to fetch accounts', error);
    }
  };
  
  
  const createAccount = async () => {
    try {
      const res = await axios.post('/auth/register', newAccount, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchAccounts(); // Refresh the accounts list after creation
      setNewAccount({ username: '', email: '', company: '', password: '' }); // Clear form
    } catch (error) {
      console.error('Failed to create account', error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const res = await axios.delete(`/auth/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchAccounts(); // Refresh the accounts list after deletion
    } catch (error) {
      console.error('Failed to delete account', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manage Accounts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter full name" 
                  value={newAccount.username}
                  onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter email" 
                  value={newAccount.email}
                  onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  placeholder="Enter company name" 
                  value={newAccount.company}
                  onChange={(e) => setNewAccount({ ...newAccount, company: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Initial Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter password" 
                  value={newAccount.password}
                  onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={createAccount}>Create Account</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account._id}>
            <TableCell className="font-medium">{account.username}</TableCell>
            <TableCell>{account.email}</TableCell>
            <TableCell>{account.industry ? account.industry.name : 'No Industry'}</TableCell> {/* Display industry name */}
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => deleteAccount(account._id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsPage;
