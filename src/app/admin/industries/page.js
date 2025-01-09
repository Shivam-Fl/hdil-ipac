"use client";
import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import axios from "../../../utils/axiosInstance";

const IndustriesPage = () => {
  const [industries, setIndustries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndustry, setEditingIndustry] = useState(null);

  const fetchIndustries = async () => {
    try {
      const response = await axios.get("/industries");
      setIndustries(response.data);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await axios.put(`/industries/${id}`, updatedData);
      setIndustries((prev) =>
        prev.map((industry) =>
          industry?._id === id ? response.data : industry
        )
      );
      setEditingIndustry(null);
    } catch (error) {
      console.error("Error updating industry:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/industries/${id}`);
      setIndustries((prev) => prev.filter((industry) => industry?._id !== id));
    } catch (error) {
      console.error("Error deleting industry:", error);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manage Industries</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search industries..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Industry Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIndustries.map((industry) => (
            <TableRow key={industry?._id}>
              <TableCell>{industry?.name}</TableCell>
              <TableCell>{industry?.owner?.username}</TableCell>
              <TableCell>{industry?.type || "N/A"}</TableCell>
              <TableCell>{industry?.status || "N/A"}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog
                    open={editingIndustry === industry?._id}
                    onOpenChange={(isOpen) =>
                      setEditingIndustry(isOpen ? industry?._id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    
<DialogContent>
  <DialogHeader>
    <DialogTitle>Edit Industry</DialogTitle>
  </DialogHeader>
  <div className="space-y-4">
    {/* Industry Name */}
    <div className="grid w-full gap-2">
      <Label htmlFor="edit-name">Industry Name</Label>
      <Input
        id="edit-name"
        defaultValue={editingIndustry?.name}
        onChange={(e) =>
          setEditingIndustry((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
      />
    </div>
    
    {/* Description */}
    <div className="grid w-full gap-2">
      <Label htmlFor="edit-description">Description</Label>
      <Input
        id="edit-description"
        defaultValue={editingIndustry?.description}
        onChange={(e) =>
          setEditingIndustry((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
    </div>

    {/* Products */}
    <div className="space-y-2">
      <Label>Products</Label>
      {editingIndustry?.products?.map((product, index) => (
        <div key={index} className="grid gap-2">
          <Input
            placeholder="Product Name"
            defaultValue={product.name}
            onChange={(e) =>
              setEditingIndustry((prev) => {
                const updatedProducts = [...prev.products];
                updatedProducts[index].name = e.target.value;
                return { ...prev, products: updatedProducts };
              })
            }
          />
          <Input
            placeholder="Description"
            defaultValue={product.description}
            onChange={(e) =>
              setEditingIndustry((prev) => {
                const updatedProducts = [...prev.products];
                updatedProducts[index].description = e.target.value;
                return { ...prev, products: updatedProducts };
              })
            }
          />
          <Input
            type="number"
            placeholder="Price"
            defaultValue={product.price}
            onChange={(e) =>
              setEditingIndustry((prev) => {
                const updatedProducts = [...prev.products];
                updatedProducts[index].price = e.target.value;
                return { ...prev, products: updatedProducts };
              })
            }
          />
        </div>
      ))}
      <Button
        onClick={() =>
          setEditingIndustry((prev) => ({
            ...prev,
            products: [...prev.products, { name: "", description: "", price: "" }],
          }))
        }
      >
        Add Product
      </Button>
    </div>

    {/* Materials */}
    <div className="grid w-full gap-2">
      <Label>Materials</Label>
      <Input
        defaultValue={editingIndustry?.materials?.join(", ")}
        onChange={(e) =>
          setEditingIndustry((prev) => ({
            ...prev,
            materials: e.target.value.split(",").map((item) => item.trim()),
          }))
        }
      />
    </div>

    {/* GST Information */}
    <div className="grid w-full gap-2">
      <Label>GST Information</Label>
      <Input
        defaultValue={editingIndustry?.gstInfo}
        onChange={(e) =>
          setEditingIndustry((prev) => ({
            ...prev,
            gstInfo: e.target.value,
          }))
        }
      />
    </div>

    {/* Contact Number */}
    <div className="grid w-full gap-2">
      <Label>Contact Number</Label>
      <Input
        defaultValue={editingIndustry?.contactNumber}
        onChange={(e) =>
          setEditingIndustry((prev) => ({
            ...prev,
            contactNumber: e.target.value,
          }))
        }
      />
    </div>

    {/* Vacancy */}
    <div className="grid w-full gap-2">
      <Label>Vacancy</Label>
      <Input
        type="checkbox"
        checked={editingIndustry?.vacancy?.available}
        onChange={(e) =>
          setEditingIndustry((prev) => ({
            ...prev,
            vacancy: { ...prev.vacancy, available: e.target.checked },
          }))
        }
      />
      <Input
        placeholder="Vacancy Description"
        defaultValue={editingIndustry?.vacancy?.description}
        onChange={(e) =>
          setEditingIndustry((prev) => ({
            ...prev,
            vacancy: { ...prev.vacancy, description: e.target.value },
          }))
        }
      />
    </div>

    {/* Images */}
    <div className="space-y-2">
      <Label>Images</Label>
      {editingIndustry?.images?.map((image, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            placeholder="Image URL"
            defaultValue={image}
            onChange={(e) =>
              setEditingIndustry((prev) => {
                const updatedImages = [...prev.images];
                updatedImages[index] = e.target.value;
                return { ...prev, images: updatedImages };
              })
            }
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() =>
              setEditingIndustry((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
              }))
            }
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        onClick={() =>
          setEditingIndustry((prev) => ({
            ...prev,
            images: [...prev.images, ""],
          }))
        }
      >
        Add More Images
      </Button>
    </div>

    {/* Save Changes */}
    <Button
      className="w-full"
      onClick={() => handleEdit(editingIndustry?._id, editingIndustry)}
    >
      Save Changes
    </Button>
  </div>
</DialogContent>

                  </Dialog>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(industry._id)}
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

export default IndustriesPage;
