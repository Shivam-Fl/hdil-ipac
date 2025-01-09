"use client";
import React from "react";
import axiosInstance from "@/utils/axiosInstance"; // Import your axios instance
import { Plus, Pencil, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmergencyContactsPage = () => {
  const [contacts, setContacts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    number: "",
    category: "",
  });
  const [editData, setEditData] = React.useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const categories = ["Emergency", "Service Provider", "Other"];

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get("/emergency");
      console.log(res.data);
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    try {
      const res = await axiosInstance.post("/emergency", formData);
      setContacts([...contacts, res.data]);
      setFormData({ name: "", number: "", category: "" });
      setIsAddModalOpen(false);
      toast.success("Contact added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add contact");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/emergency/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete contact");
    }
  };

  const handleEditContact = async () => {
    try {
      const res = await axiosInstance.put(`/emergency/${editData._id}`, editData);
      setContacts(
        contacts.map((contact) =>
          contact._id === editData._id ? res.data : contact
        )
      );
      setEditData(null);
      setIsEditModalOpen(false); // Close the edit modal
      toast.success("Contact updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update contact");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Emergency Contacts</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Contact Name</Label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Enter contact name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-number">Phone Number</Label>
                <Input
                  id="contact-number"
                  name="number"
                  placeholder="Enter phone number"
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleAddContact}>
                Add Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.number}</TableCell>
              <TableCell>{contact.category}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditData(contact);
                          setIsEditModalOpen(true); // Open the edit modal
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Contact</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit-name">Contact Name</Label>
                          <Input
                            id="edit-name"
                            defaultValue={editData?.name}
                            onChange={(e) =>
                              setEditData({ ...editData, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-number">Phone Number</Label>
                          <Input
                            id="edit-number"
                            defaultValue={editData?.number}
                            onChange={(e) =>
                              setEditData({ ...editData, number: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit-category">Category</Label>
                          <Select
                            defaultValue={editData?.category}
                            onValueChange={(value) =>
                              setEditData({ ...editData, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full" onClick={handleEditContact}>
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(contact._id)}
                  >
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

export default EmergencyContactsPage;
