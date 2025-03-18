"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "@/utils/axiosInstance";
import { Plus, Trash2, MessageCircle, Clock, CheckCircle, XCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_URL = "/feedback";

const FeedbackAdminPage = () => {
  // State for feedback questions
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");
  
  // State for question dialog
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    category: "general",
    expiresAt: ""
  });
  
  // State for response dialog
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");
  const [currentResponseId, setCurrentResponseId] = useState(null);
  
  // Filter states
  const [questionFilter, setQuestionFilter] = useState("all");
  const [responseFilter, setResponseFilter] = useState("all");

  // Fetch data on component mount
  useEffect(() => {
    fetchQuestions();
    fetchResponses();
  }, []);

  // Fetch all feedback questions (admin view)
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/questions/admin`);
      setQuestions(response.data);
    } catch (error) {
      toast.error("Error fetching feedback questions");
      console.error("Error fetching questions:", error);
    }
  };

  // Fetch all feedback responses (admin view)
  const fetchResponses = async () => {
    try {
      const response = await axios.get(`${API_URL}/responses/admin`);
      setResponses(response.data);
    } catch (error) {
      toast.error("Error fetching feedback responses");
      console.error("Error fetching responses:", error);
    }
  };

  // Create new feedback question
  const handleCreateQuestion = async () => {
    try {
      const response = await axios.post(`${API_URL}/questions`, newQuestion);
      setQuestions([response.data, ...questions]);
      toast.success("Feedback question created successfully!");
      setNewQuestion({
        title: "",
        description: "",
        category: "general",
        expiresAt: ""
      });
      setIsQuestionDialogOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.errors?.[0]?.msg || "Error creating feedback question");
    }
  };

  // Delete a feedback question
  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`${API_URL}/questions/${questionId}`);
      setQuestions(questions.filter((q) => q._id !== questionId));
      toast.success("Feedback question deleted successfully!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg === "Feedback question deactivated (has responses)") {
        // If the question has responses, it is only deactivated
        const updatedQuestions = questions.map(q => 
          q._id === questionId ? { ...q, isActive: false } : q
        );
        setQuestions(updatedQuestions);
        toast.info("Feedback question deactivated (has responses)");
      } else {
        toast.error("Error deleting feedback question");
        console.error("Error deleting question:", error);
      }
    }
  };

  // Toggle question active status
  const handleToggleActiveStatus = async (questionId, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/questions/${questionId}`, {
        isActive: !currentStatus,
        // We need to include these required fields too
        title: questions.find(q => q._id === questionId).title,
        description: questions.find(q => q._id === questionId).description
      });
      
      setQuestions(questions.map((q) => (q._id === questionId ? response.data : q)));
      toast.success(`Feedback question ${response.data.isActive ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      toast.error("Error updating question status");
      console.error("Error updating question status:", error);
    }
  };

  // Add admin comment to response
  const handleAddComment = async () => {
    try {
      const response = await axios.put(`${API_URL}/responses/${currentResponseId}/comment`, {
        adminComment
      });
      
      setResponses(responses.map((r) => (r._id === currentResponseId ? response.data : r)));
      toast.success("Comment added successfully!");
      setAdminComment("");
      setIsResponseDialogOpen(false);
    } catch (error) {
      toast.error("Error adding comment");
      console.error("Error adding comment:", error);
    }
  };

  // Update response status
  const handleUpdateResponseStatus = async (responseId, status) => {
    try {
      const response = await axios.put(`${API_URL}/responses/${responseId}/status`, { status });
      setResponses(responses.map((r) => (r._id === responseId ? response.data : r)));
      toast.success(`Response marked as ${status}!`);
    } catch (error) {
      toast.error("Error updating response status");
      console.error("Error updating response status:", error);
    }
  };

  // Handle opening the response dialog
  const openResponseDialog = (responseId) => {
    setCurrentResponseId(responseId);
    setIsResponseDialogOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'No expiry';
    return new Date(dateString).toLocaleDateString();
  };

  // Filter questions based on current filter
  const filteredQuestions = questions.filter((question) => {
    if (questionFilter === "all") return true;
    if (questionFilter === "active") return question.isActive;
    if (questionFilter === "inactive") return !question.isActive;
    if (questionFilter === "expired") {
      return question.expiresAt && new Date(question.expiresAt) < new Date();
    }
    return question.category === questionFilter;
  });

  // Filter responses based on current filter
  const filteredResponses = responses.filter((response) => {
    if (responseFilter === "all") return true;
    return response.status === responseFilter;
  });

  // Get status badge for responses
  const getResponseStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      viewed: "bg-blue-100 text-blue-800",
      addressed: "bg-green-100 text-green-800"
    };
    return <Badge className={styles[status] || "bg-gray-100"}>{formatResponseStatus(status)}</Badge>;
  };

  // Format response status for display
  const formatResponseStatus = (status) => {
    switch (status) {
      case "pending": return "Pending";
      case "viewed": return "Viewed";
      case "addressed": return "Addressed";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Feedback Management</h2>
          <p className="text-gray-500 mt-2">Manage feedback questions and responses from federation members</p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>

        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Label htmlFor="question-filter" className="text-sm">Filter:</Label>
              <Select value={questionFilter} onValueChange={setQuestionFilter}>
                <SelectTrigger id="question-filter" className="w-[180px]">
                  <SelectValue placeholder="Filter questions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Questions</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="general">General Category</SelectItem>
                  <SelectItem value="technical">Technical Category</SelectItem>
                  <SelectItem value="feature">Feature Requests</SelectItem>
                  <SelectItem value="service">Service Feedback</SelectItem>
                  <SelectItem value="other">Other Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Feedback Question</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="question-title">Question Title</Label>
                    <Input
                      id="question-title"
                      placeholder="Enter question title"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="question-description">Description</Label>
                    <Textarea
                      id="question-description"
                      placeholder="Provide detailed description"
                      rows={4}
                      value={newQuestion.description}
                      onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="question-category">Category</Label>
                      <Select
                        value={newQuestion.category}
                        onValueChange={(value) => setNewQuestion({ ...newQuestion, category: value })}
                      >
                        <SelectTrigger id="question-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="question-expires">Expires At (Optional)</Label>
                      <Input
                        id="question-expires"
                        type="date"
                        value={newQuestion.expiresAt}
                        onChange={(e) => setNewQuestion({ ...newQuestion, expiresAt: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleCreateQuestion}>
                    Create Question
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Questions List */}
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <Card key={question._id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{question.title}</CardTitle>
                      <CardDescription className="mt-2">{question.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={question.isActive ? "success" : "secondary"}>
                        {question.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteQuestion(question._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="capitalize">Category: {question.category}</Badge>
                    <Badge variant="outline">
                      Expires: {formatDate(question.expiresAt)}
                    </Badge>
                    <Badge variant="outline">ID: {question._id}</Badge>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Created by: {question.createdBy?.username || "Admin"}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(question.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 border-t">
                  <Button 
                    variant={question.isActive ? "outline" : "default"}
                    onClick={() => handleToggleActiveStatus(question._id, question.isActive)}
                  >
                    {question.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button onClick={() => {
                    setActiveTab("responses");
                    setResponseFilter(question._id);
                  }}>
                    View Responses
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No feedback questions available.</p>
          )}
        </TabsContent>

        {/* Responses Tab */}
        <TabsContent value="responses" className="space-y-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Label htmlFor="response-filter" className="text-sm">Filter:</Label>
            <Select value={responseFilter} onValueChange={setResponseFilter}>
              <SelectTrigger id="response-filter" className="w-[180px]">
                <SelectValue placeholder="Filter responses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Responses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="addressed">Addressed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Responses List */}
          {filteredResponses.length > 0 ? (
            filteredResponses.map((response) => (
              <Card key={response._id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {response.feedbackId?.title || "Unknown Question"}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Category: {response.feedbackId?.category || "Unknown"}
                      </CardDescription>
                    </div>
                    <div>
                      {getResponseStatusBadge(response.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <h4 className="text-sm font-medium mb-1">User Response:</h4>
                    <p className="text-sm">{response.response}</p>
                    {response.rating && (
                      <div className="mt-2">
                        <Badge variant="outline">Rating: {response.rating}/5</Badge>
                      </div>
                    )}
                  </div>
                  
                  {response.adminComment && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <h4 className="text-sm font-medium mb-1">Admin Comment:</h4>
                      <p className="text-sm">{response.adminComment}</p>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {response.createdBy?.username || "Anonymous"}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(response.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUpdateResponseStatus(response._id, "viewed")}
                    >
                      Mark as Viewed
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600" 
                      onClick={() => handleUpdateResponseStatus(response._id, "addressed")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark as Addressed
                    </Button>
                  </div>
                  <Button onClick={() => openResponseDialog(response._id)}>
                    Add Comment
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No feedback responses available.</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Comment Dialog */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Admin Comment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-comment">Your Comment</Label>
              <Textarea
                id="admin-comment"
                placeholder="Write your comment..."
                rows={4}
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleAddComment}>
              Submit Comment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackAdminPage;