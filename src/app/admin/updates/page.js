"use client"
import { useState, useEffect } from "react"
import axios from "../../../utils/axiosInstance"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { formatDate } from "@/utils/dateUtils"
import { Download } from "lucide-react"

const UpdatesManager = () => {
  const [activeTab, setActiveTab] = useState("news")
  const [updates, setUpdates] = useState([])
  const [formData, setFormData] = useState({
    type: "news",
    title: "",
    content: "",
    redirectUrl: "",
    date: "",
    location: "",
    imageFile: null,
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [editId, setEditId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName || "downloaded-file"
      link.click()
      URL.revokeObjectURL(link.href) // Clean up
    } catch (error) {
      console.error("Error downloading file:", error)
      toast.error("Failed to download file. Please try again.")
    }
  }

  const API_URL = "/updates"

  // Fetch Updates
  const fetchUpdates = async () => {
    try {
      let endpoint = API_URL

      // Use the privateUpdates endpoint for notices and workshop tabs
      if (activeTab === "notices" || activeTab === "workshop") {
        endpoint = "/updates/privateupdates"
      }

      const response = await axios.get(endpoint)
      setUpdates(response.data.filter((item) => item.type === activeTab))
    } catch (err) {
      console.error("Error fetching updates:", err)
      toast.error("Failed to fetch updates. Please try again later.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, content, redirectUrl, imageFile, date, location } = formData
    const type = activeTab

    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const form = new FormData()
      form.append("type", type)
      form.append("title", title)
      form.append("content", content) // Send content without appending location and date

      if (redirectUrl) form.append("redirectUrl", redirectUrl)
      if (date) form.append("date", date) // Send date as separate field

      // Send location as separate field for workshop type
      if (type === "workshop" && location) {
        form.append("location", location)
      }

      if (imageFile) form.append("imageFile", imageFile)

      const config = { headers: { "Content-Type": "multipart/form-data" } }

      if (isEditMode) {
        await axios.put(`${API_URL}/${editId}`, form, config)
        toast.success("Update edited successfully.")
      } else {
        await axios.post(API_URL, form, config)
        toast.success("Update added successfully.")
      }

      setFormData({
        type: activeTab,
        title: "",
        content: "",
        redirectUrl: "",
        location: "",
        date: "",
        imageFile: null,
      })
      setIsDialogOpen(false)
      setIsEditMode(false)
      fetchUpdates()
    } catch (err) {
      console.error("Error submitting update:", err)
      toast.error(err.response?.data?.msg || "Error submitting the update. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "imageFile" && files[0]) {
      const file = files[0]

      // Validate file size (common for all tabs)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeded. File size should not exceed 5MB.")
        return
      }

      // Specific validation for notices tab
      if (
        activeTab === "notices" &&
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "text/plain",
        ].includes(file.type)
      ) {
        toast.error("Invalid file type. Only PDF, DOC, DOCX, PPT, PPTX, and TXT files are allowed.")
        return
      }

      // Specific validation for other tabs (e.g., images)
      if (activeTab !== "notices" && !["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Invalid file type. Only JPEG and PNG images are allowed.")
        return
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  // Delete Update
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`)
      toast.success("Update deleted successfully.")
      setDeleteId(null)
      setIsDeleteModalOpen(false)
      fetchUpdates()
    } catch (err) {
      console.error("Error deleting update:", err)
      toast.error(err.response?.data?.error || "Error deleting update. Please try again later.")
    }
  }

  const handleEdit = (update) => {
    setIsEditMode(true)
    setEditId(update._id)

    setFormData({
      type: update.type,
      title: update.title,
      content: update.content,
      redirectUrl: update.redirectUrl || "",
      location: update.location || "", // Get location directly from the update object
      date: update.date || "",
      imageFile: null,
    })

    setIsDialogOpen(true)
  }

  const openDeleteModal = (id) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteId(null)
    setIsDeleteModalOpen(false)
  }

  useEffect(() => {
    fetchUpdates()
  }, [activeTab])

  return (
    <div className="p-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="announcement">Announcements</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Button onClick={() => setIsDialogOpen(true)}>Add New</Button>
          <div className="mt-4">
            {updates.map((update) => (
              <div key={update._id} className="border p-4 rounded mb-2 flex gap-4">
                {update.imageUrl && activeTab !== "notices" && (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={update.imageUrl || "/placeholder.svg"}
                      alt="Update"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{update.title}</h3>
                  <p>{update.content}</p>
                  {update.imageUrl && activeTab === "notices" && (

                    
                    <Button
                      size="sm"
                      variant="outline"
                      
                      onClick={() => downloadFile(update.imageUrl, `${update.type}-${update.title}`)}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Attachment</span>
                    </Button>
            
                )}

                  {/* Display date field for all types */}
                  {update.date && (
                    <p>
                      <strong>Date:</strong> {formatDate(update.date)}
                    </p>
                  )}

                  {/* Display location field only for workshop type */}
                  {update.type === "workshop" && update.location && (
                    <p>
                      <strong>Location:</strong> {update.location}
                    </p>
                  )}
                  
                </div>
                <div className="flex flex-col gap-2">
                  <Button onClick={() => handleEdit(update)} size="sm">
                    Edit
                  </Button>
                  <Button onClick={() => openDeleteModal(update._id)} size="sm" variant="destructive">
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
            {activeTab === "blogs" || activeTab === "workshop" ? (
              <Input
                name="redirectUrl"
                placeholder="Redirect URL"
                value={formData.redirectUrl}
                onChange={handleChange}
                className="mb-4"
              />
            ) : null}
            {activeTab === "workshop" && (
              <>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="mb-4"
                />
                <Textarea
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mb-4"
                />
              </>
            )}
            {activeTab !== "workshop" && (
              <Input
                type="file"
                name="imageFile"
                onChange={handleChange}
                accept={activeTab === "notices" ? ".pdf,.doc,.docx,.ppt,.pptx,.txt" : "image/*"}
                className="mb-4"
              />
            )}

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
  )
}

export default UpdatesManager

