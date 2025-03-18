"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "@/utils/axiosInstance";
import { Plus, Trash2, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const API_URL = "/polls";

const PollsPage = () => {
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: ["", ""],
    expiresAt: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin`);
        setPolls(response.data);
      } catch (error) {
        toast.error("Error fetching polls.");
        console.error("Error fetching polls:", error);
      }
    };
    fetchPolls();
  }, []);

  const addOption = () => {
    setNewPoll({ ...newPoll, options: [...newPoll.options, ""] });
  };

  const removeOption = (index) => {
    setNewPoll({
      ...newPoll,
      options: newPoll.options.filter((_, i) => i !== index),
    });
  };

  const handleCreatePoll = async () => {
    try {
      const response = await axios.post(API_URL, newPoll);
      setPolls([response.data, ...polls]);
      toast.success("Poll created successfully!");
      setNewPoll({ question: "", options: ["", ""], expiresAt: "" });
      setIsDialogOpen(false); // Close the modal
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]?.msg);
      
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      const response = await axios.put(`${API_URL}/${pollId}/vote`, { optionIndex });
      setPolls(polls.map((p) => (p._id === pollId ? response.data : p)));
      toast.success("Vote recorded successfully!");
    } catch (error) {
      toast.error(error);
      console.error("Error voting on poll:", error);
    }
  };

  const handleDeletePoll = async (pollId) => {
    try {
      await axios.delete(`${API_URL}/${pollId}`);
      setPolls(polls.filter((p) => p._id !== pollId));
      toast.success("Poll deleted successfully!");
    } catch (error) {
      toast.error("Error deleting poll. Please try again.");
      console.error("Error deleting poll:", error);
    }
  };

  const getStatusBadge = (poll) => {
    const isActive = new Date(poll.expiresAt) > new Date();
    const status = isActive ? "active" : "ended";
    const styles = {
      active: "bg-green-100 text-green-800",
      ended: "bg-gray-100 text-gray-800",
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Polls Management</h2>
          <p className="text-gray-500 mt-2">Create and manage polls for federation members</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Poll
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Poll</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="poll-title">Poll Title</Label>
                <Input
                  id="poll-title"
                  placeholder="Enter poll title"
                  value={newPoll.question}
                  onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Options</Label>
                <div className="space-y-2">
                  {newPoll.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const options = [...newPoll.options];
                          options[index] = e.target.value;
                          setNewPoll({ ...newPoll, options });
                        }}
                      />
                      {index > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={addOption}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={newPoll.expiresAt}
                  onChange={(e) => setNewPoll({ ...newPoll, expiresAt: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleCreatePoll}>
                Create Poll
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs for Active and Ended Polls */}
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Polls</TabsTrigger>
          <TabsTrigger value="ended">Ended Polls</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {polls.filter((poll) => new Date(poll.expiresAt) > new Date()).length > 0 ? (
            polls.filter((poll) => new Date(poll.expiresAt) > new Date()).map((poll) => (
              <PollCard
                key={poll._id}
                poll={poll}
                onVote={handleVote}
                onDelete={handleDeletePoll}
                getStatusBadge={getStatusBadge}
              />
            ))
          ) : (
            <p className="text-gray-500">No active polls available.</p>
          )}
        </TabsContent>
        <TabsContent value="ended" className="space-y-4">
          {polls.filter((poll) => new Date(poll.expiresAt) <= new Date()).length > 0 ? (
            polls.filter((poll) => new Date(poll.expiresAt) <= new Date()).map((poll) => (
              <PollCard
                key={poll._id}
                poll={poll}
                onVote={handleVote}
                onDelete={handleDeletePoll}
                getStatusBadge={getStatusBadge}
              />
            ))
          ) : (
            <p className="text-gray-500">No ended polls available.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PollCard = ({ poll, onVote, onDelete, getStatusBadge }) => {
  const calculatePercentage = (votes, total) => {
    return Math.round((votes / total) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{poll.question}</CardTitle>
            <CardDescription className="mt-2">{poll.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(poll)}
            <Button variant="destructive" size="icon" onClick={() => onDelete(poll._id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {poll.options.map((option, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{option.text}</span>
                  <span className="font-medium">
                    {calculatePercentage(option.votes, poll.totalVotes || 1)}%
                  </span>
                </div>
                <Progress value={calculatePercentage(option.votes, poll.totalVotes || 1)} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {poll.totalVotes || 0} votes
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Ends: {new Date(poll.expiresAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollsPage;
