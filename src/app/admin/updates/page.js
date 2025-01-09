"use client"
import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const UpdatesManager = () => {
  const [activeTab, setActiveTab] = useState("news");
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    type: "news",
    title: "",
    content: "",
    redirectUrl: "",
    imageFile: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = "/updates";

  // Fetch Updates
  const fetchUpdates = async () => {
    try {
      const response = await axios.get(API_URL);
      setUpdates(response.data.filter((item) => item.type === activeTab));
    } catch (err) {
      console.error("Error fetching updates:", err);
      toast.error("Failed to fetch updates. Please try again later.");
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, redirectUrl, imageFile } = formData;
    const type = activeTab;

    if (isSubmitting) return; // Prevent submitting if already submitting
    setIsSubmitting(true); // Set submitting state to true

    try {
      const form = new FormData();
      form.append("type", type);
      form.append("title", title);
      form.append("content", content);
      if (redirectUrl) form.append("redirectUrl", redirectUrl);
      if (imageFile) form.append("imageFile", imageFile);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (isEditMode) {
        await axios.put(`${API_URL}/${editId}`, form, config);
        toast.success("Update edited successfully.");
      } else {
        await axios.post(API_URL, form, config);
        toast.success("Update added successfully.");
      }

      setFormData({
        type: activeTab,
        title: "",
        content: "",
        redirectUrl: "",
        imageFile: null,
      });
      setIsDialogOpen(false);
      setIsEditMode(false);
      fetchUpdates();
    } catch (err) {
      console.error("Error submitting update:", err);
      toast.error(err.response?.data?.msg || "Error submitting the update. Please try again later.");
    } finally {
      setIsSubmitting(false); // Reset submitting state after API call completes
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageFile" && files[0]) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeded. File size should not exceed 2MB.");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Invalid file type. Only JPEG and PNG images are allowed.");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Delete Update
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      toast.success("Update deleted successfully.");
      setDeleteId(null);
      setIsDeleteModalOpen(false);
      fetchUpdates();
    } catch (err) {
      console.error("Error deleting update:", err);
      toast.error(err.response?.data?.error || "Error deleting update. Please try again later.");
    }
  };

  const handleEdit = (update) => {
    setIsEditMode(true);
    setEditId(update._id);
    setFormData({
      type: update.type,
      title: update.title,
      content: update.content,
      redirectUrl: update.redirectUrl || "",
      imageFile: null,
    });
    setIsDialogOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchUpdates();
  }, [activeTab]);

  return (
    <div className="p-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="announcement">Announcements</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Button onClick={() => setIsDialogOpen(true)}>Add New</Button>
          <div className="mt-4">
            {updates.map((update) => (
              <div key={update._id} className="border p-4 rounded mb-2 flex gap-4">
                {update.imageUrl && (
                  <img src={update.imageUrl} alt="Update" className="w-32 h-32 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{update.title}</h3>
                  <p>{update.content}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleEdit(update)} size="sm">
                    Edit
                  </Button>
                  <Button
                    onClick={() => openDeleteModal(update._id)}
                    size="sm"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Update" : "Add New Update"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <Textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              required
              className="mb-4"
            />
            {activeTab === "blogs" && (
              <Input
                name="redirectUrl"
                placeholder="Redirect URL"
                value={formData.redirectUrl}
                onChange={handleChange}
                className="mb-4"
              />
            )}
            <Input
              type="file"
              name="imageFile"
              onChange={handleChange}
              accept="image/*"
              className="mb-4"
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isEditMode ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={closeDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <p>Are you sure you want to delete this update?</p>
          </div>
          <DialogFooter>
            <Button onClick={closeDeleteModal}>Cancel</Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default UpdatesManager;
