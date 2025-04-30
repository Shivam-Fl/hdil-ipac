"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axiosInstance from "@/utils/axiosInstance"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, Plus, Trash2, Upload, ImageIcon, Tag, Info, Phone, Mail } from "lucide-react"
import {  MapPin } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"

const IndustryForm = ({ initialData = null }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("edit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gstInfo: "",
    contactNumber: "",
    email: "",
    address: "",
    legalInformation: "",
    vacancy: {
      available: false,
      description: "",
    },
    products: [],
    materials: [],
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    imageFiles: [],
  });
  const [productImagePreviews, setProductImagePreviews] = useState([]);
  const [material, setMaterial] = useState("");
  const [activeProductImageIndex, setActiveProductImageIndex] = useState(0);

  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      const {
        name,
        description,
        gstInfo,
        contactNumber,
        email,
        address,
        legalInformation,
        vacancy,
        products,
        materials,
        images,
      } = initialData;

      setFormData({
        name: name || "",
        description: description || "",
        gstInfo: gstInfo || "",
        contactNumber: contactNumber || "",
        email: email || "",
        address: address || "",
        legalInformation: legalInformation || "",
        vacancy: {
          available: vacancy?.available || false,
          description: vacancy?.description || "",
        },
        products: products || [],
        materials: materials || [],
        images: images || [],
      });

      // Set preview images from existing images
      setPreviewImages(images || []);
    }
  }, [initialData]);

  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "vacancy.available") {
      setFormData({
        ...formData,
        vacancy: {
          ...formData.vacancy,
          available: checked,
        },
      });
    } else if (name === "vacancy.description") {
      setFormData({
        ...formData,
        vacancy: {
          ...formData.vacancy,
          description: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle image file selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 5 images
    const newFiles = files.slice(0, 5);
    setImageFiles(newFiles);

    // Generate preview URLs
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Handle product image upload
  const handleProductImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Limit to 3 images per product
    const newFiles = files.slice(0, 3);

    setProduct({
      ...product,
      imageFiles: newFiles,
    });

    // Generate preview URLs
    const previews = newFiles.map((file) => URL.createObjectURL(file));
    setProductImagePreviews(previews);
  };

  // Handle product input changes
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Add product to list
  const addProduct = () => {
    if (product.name && product.price) {
      const newProduct = {
        name: product.name,
        description: product.description,
        price: Number.parseFloat(product.price) || 0,
        images: productImagePreviews,
        imageFiles: product.imageFiles,
      };

      setFormData({
        ...formData,
        products: [...formData.products, newProduct],
      });

      // Reset product form
      setProduct({ name: "", description: "", price: "", images: [], imageFiles: [] });
      setProductImagePreviews([]);
    }
  };

  // Remove product from list
  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      products: updatedProducts,
    });
  };

  // Add material to list
  const addMaterial = () => {
    if (material) {
      setFormData({
        ...formData,
        materials: [...formData.materials, material],
      });
      setMaterial("");
    }
  };

  // Remove material from list
  const removeMaterial = (index) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials.splice(index, 1);
    setFormData({
      ...formData,
      materials: updatedMaterials,
    });
  };

  // Open product detail modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setActiveProductImageIndex(0);
  };

  // Close product detail modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Navigate through industry images
  const navigateImages = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev === previewImages.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentImageIndex((prev) => (prev === 0 ? previewImages.length - 1 : prev - 1));
    }
  };

  // Navigate through product images
  const navigateProductImages = (direction) => {
    if (!selectedProduct || !selectedProduct.images || selectedProduct.images.length <= 1) return;

    if (direction === "next") {
      setActiveProductImageIndex((prev) => (prev === selectedProduct.images.length - 1 ? 0 : prev + 1));
    } else {
      setActiveProductImageIndex((prev) => (prev === 0 ? selectedProduct.images.length - 1 : prev - 1));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create FormData object for multipart/form-data submission
      const formDataToSubmit = new FormData();

      // Append basic fields
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("gstInfo", formData.gstInfo);
      formDataToSubmit.append("contactNumber", formData.contactNumber);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("address", formData.address);
      formDataToSubmit.append("legalInformation", formData.legalInformation);
      formDataToSubmit.append("vacancy[available]", formData.vacancy.available);
      formDataToSubmit.append("vacancy[description]", formData.vacancy.description);

      // Prepare products data with images
      const productsForSubmit = formData.products.map((prod) => {
        // Don't include imageFiles in the JSON
        const { imageFiles, ...prodWithoutImageFiles } = prod;
        return prodWithoutImageFiles;
      });

      // Append products as JSON string
      formDataToSubmit.append("products", JSON.stringify(productsForSubmit));

      // Append materials as JSON string
      formDataToSubmit.append("materials", JSON.stringify(formData.materials));

      // Append industry image files
      imageFiles.forEach((file) => {
        formDataToSubmit.append("industryImages", file);
      });

      // Append product image files
      formData.products.forEach((prod, productIndex) => {
        if (prod.imageFiles && prod.imageFiles.length > 0) {
          prod.imageFiles.forEach((file) => {
            formDataToSubmit.append(`productImages[${productIndex}]`, file);
          });
        }
      });

      let response;
      if (initialData?._id) {
        // Update existing industry
        response = await axiosInstance.put(`/industries/${initialData._id}`, formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new industry
        response = await axiosInstance.post("/industries", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setSuccess(true);
      setLoading(false);

      // Switch to preview tab after successful submission
      setActiveTab("preview");

      // If new industry was created, redirect after a delay
      if (!initialData?._id) {
        setTimeout(() => {
          router.push(`/industries/${response.data._id}`);
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to submit industry data");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle>{initialData?._id ? "Edit Industry" : "Create Industry"}</CardTitle>
        <CardDescription>
          Fill in the details to {initialData?._id ? "update" : "create"} your industry profile
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-xs mx-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
              <Info size={16} />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center gap-2">
              <Info size={16} />
              Industry {initialData?._id ? "updated" : "created"} successfully!
            </div>
          )}

          <TabsContent value="edit" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel htmlFor="name">Industry Name* (max 50 characters)</FormLabel>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={50}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <FormLabel htmlFor="gstInfo">GST Information*</FormLabel>
                    <Input
                      id="gstInfo"
                      name="gstInfo"
                      value={formData.gstInfo}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <FormLabel htmlFor="description">Description* (max 500 characters)</FormLabel>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={4}
                    className="mt-1"
                  />
                  <FormDescription className="text-right">{formData.description.length}/500 characters</FormDescription>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel htmlFor="contactNumber">Contact Number*</FormLabel>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <FormLabel htmlFor="email">Email*</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <FormLabel htmlFor="address">Address*</FormLabel>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="vacancy"
                      name="vacancy.available"
                      checked={formData.vacancy.available}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          vacancy: {
                            ...formData.vacancy,
                            available: checked,
                          },
                        })
                      }
                    />
                    <FormLabel htmlFor="vacancy" className="cursor-pointer">
                      Has Vacancy
                    </FormLabel>
                  </div>

                  {formData.vacancy.available && (
                    <div className="pl-6 border-l-2 border-muted mt-2">
                      <FormLabel htmlFor="vacancyDescription">Vacancy Description</FormLabel>
                      <Textarea
                        id="vacancyDescription"
                        name="vacancy.description"
                        value={formData.vacancy.description}
                        onChange={handleChange}
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Products Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Products</h3>
                <Separator />

                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <FormLabel htmlFor="productName">Product Name*</FormLabel>
                        <Input
                          id="productName"
                          name="name"
                          value={product.name}
                          onChange={handleProductChange}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <FormLabel htmlFor="productDescription">Description</FormLabel>
                        <Input
                          id="productDescription"
                          name="description"
                          value={product.description}
                          onChange={handleProductChange}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <FormLabel htmlFor="productPrice">Price*</FormLabel>
                        <Input
                          id="productPrice"
                          type="number"
                          name="price"
                          value={product.price}
                          onChange={handleProductChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <FormLabel htmlFor="productImages">Product Images (Max 3)</FormLabel>
                      <div className="mt-1 border-2 border-dashed rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <label htmlFor="productImages" className="flex flex-col items-center gap-2 cursor-pointer">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                          <Input
                            id="productImages"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleProductImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {productImagePreviews.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {productImagePreviews.map((src, index) => (
                            <div key={index} className="relative group">
                              <div className="h-24 rounded-md overflow-hidden border">
                                <img
                                  src={src || "/placeholder.svg"}
                                  alt={`Product preview ${index}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newPreviews = [...productImagePreviews]
                                  newPreviews.splice(index, 1)
                                  setProductImagePreviews(newPreviews)

                                  const newFiles = [...product.imageFiles]
                                  newFiles.splice(index, 1)
                                  setProduct({
                                    ...product,
                                    imageFiles: newFiles,
                                  })
                                }}
                                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      type="button"
                      onClick={addProduct}
                      disabled={!product.name || !product.price}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                  </CardContent>
                </Card>

                {formData.products.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-3">Added Products:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {formData.products.map((prod, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="relative h-40 bg-muted">
                            {prod.images && prod.images.length > 0 ? (
                              <img
                                src={prod.images[0] || "/placeholder.svg"}
                                alt={prod.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                              </div>
                            )}
                            {prod.images && prod.images.length > 1 && (
                              <Badge className="absolute bottom-2 right-2 bg-black/70">
                                +{prod.images.length - 1} more
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium truncate">{prod.name}</h3>
                                <p className="text-sm text-muted-foreground truncate">{prod.description}</p>
                                <p className="text-sm font-medium mt-1">₹{prod.price.toLocaleString("en-IN")}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeProduct(index)}
                                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Materials Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Materials</h3>
                <Separator />

                <div className="flex space-x-2">
                  <Input
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="flex-1"
                    placeholder="Enter material"
                  />
                  <Button type="button" onClick={addMaterial} disabled={!material} variant="secondary">
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>

                {formData.materials.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">Added Materials:</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.materials.map((mat, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm">
                          <Tag className="h-3 w-3 mr-1" />
                          {mat}
                          <button
                            type="button"
                            onClick={() => removeMaterial(index)}
                            className="ml-2 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Industry Images Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Industry Images {initialData?._id && "(Upload new images to replace existing ones)"}
                </h3>
                <Separator />

                <div className="mt-1 border-2 border-dashed rounded-md p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                  <label htmlFor="industryImages" className="flex flex-col items-center gap-2 cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop (Max 5 images)
                    </span>
                    <Input
                      id="industryImages"
                      type="file"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>

                {previewImages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">Image Previews:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {previewImages.map((src, index) => (
                        <div key={index} className="relative group">
                          <div className="h-32 rounded-md overflow-hidden border">
                            <img
                              src={src || "/placeholder.svg"}
                              alt={`Preview ${index}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = [...previewImages]
                              newPreviews.splice(index, 1)
                              setPreviewImages(newPreviews)

                              const newFiles = [...imageFiles]
                              newFiles.splice(index, 1)
                              setImageFiles(newFiles)
                            }}
                            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Legal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Legal Information</h3>
                <Separator />

                <div>
                  <FormLabel htmlFor="legalInformation">Legal Information</FormLabel>
                  <Textarea
                    id="legalInformation"
                    name="legalInformation"
                    value={formData.legalInformation}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? "Submitting..." : initialData?._id ? "Update Industry" : "Create Industry"}
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Preview Tab Content in TabsContent */}
<TabsContent value="preview" className="mt-0">
  <div className="bg-gray-50 p-4">
    <div className="max-w-[1200px] mx-auto">
      {/* Image Carousel */}
      <div className="relative h-[400px] mb-8">
        {previewImages.length > 0 ? (
          <>
            <img
              src={previewImages[currentImageIndex] || "/placeholder.svg"}
              alt={formData.name}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-xl" />
            
            {previewImages.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : previewImages.length - 1)}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev < previewImages.length - 1 ? prev + 1 : 0)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {previewImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl shadow-lg">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <span className="text-muted-foreground">No images uploaded</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
        {/* Main Content */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold">{formData.name || "Industry Name"}</h1>
              {formData.vacancy.available && (
                <span className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-sm font-medium">
                  Now Hiring
                </span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed">{formData.description || "Industry description will appear here."}</p>
          </div>

          {/* Materials Section */}
          {formData.materials.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Materials Used</h2>
              <div className="flex flex-wrap gap-2">
                {formData.materials.map((material, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Legal Information Section */}
      {formData.legalInformation && (
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Legal Information</h2>
          <p className="text-gray-600">{formData.legalInformation}</p>
        </div>
      )}
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{formData.contactNumber || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{formData.email || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{formData.address || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Business Information</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">GST Number</p>
                <p className="text-gray-600">{formData.gstInfo || "Not provided"}</p>
              </div>
              {formData.vacancy.available && (
                <div>
                  <p className="font-medium">Current Openings</p>
                  <p className="text-gray-600">{formData.vacancy.description || "Contact for details"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      {formData.products.length > 0 && (
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.products.map((product, index) => (
              <div 
                key={index} 
                className="group cursor-pointer"
                onClick={() => openProductModal(product)}
              >
                <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">View Details</span>
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{product.description}</p>
                  <p className="font-medium text-gray-800 mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  </div>
</TabsContent>
        </CardContent>
      </Tabs>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name || "Product Details"}</DialogTitle>
            <DialogDescription>View detailed information about this product</DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="space-y-4">
                <div className="relative rounded-md overflow-hidden bg-muted h-60">
                  {selectedProduct.images && selectedProduct.images.length > 0 ? (
                    <img
                      src={selectedProduct.images[activeProductImageIndex] || "/placeholder.svg"}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}

                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 h-8 w-8"
                        onClick={() => navigateProductImages("prev")}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 h-8 w-8"
                        onClick={() => navigateProductImages("next")}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-2 pb-1">
                      {selectedProduct.images.map((src, index) => (
                        <div
                          key={index}
                          className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden border-2 cursor-pointer ${
                            index === activeProductImageIndex ? "border-primary" : "border-transparent"
                          }`}
                          onClick={() => setActiveProductImageIndex(index)}
                        >
                          <img
                            src={src || "/placeholder.svg"}
                            alt={`Product view ${index}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                  <p className="text-lg font-medium text-primary mt-1">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.description || "No description provided for this product."}
                  </p>
                </div>

                <div className="pt-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default IndustryForm
