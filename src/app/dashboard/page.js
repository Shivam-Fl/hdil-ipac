"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PollContent = ({ polls, onSubmitPoll }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (pollId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [pollId]: optionId
    });
  };

  const handleSubmit = (pollId) => {
    console.log(selectedOptions)
    if (!selectedOptions) {
      toast.error("Please select an option before submitting");
      return;
    }
    
    onSubmitPoll(pollId, selectedOptions[pollId]);
  };

  return polls.length > 0 ? (
    <div className="space-y-6">
      {polls.map((poll) => (
        <div key={poll._id} className="border rounded-lg p-4">
          <p className="text-gray-600 mb-4">{poll.question}</p>
          <div className="space-y-2">
            {poll.options.map((option,idx) => (
              <div key={option._id} className="flex items-center p-2 bg-gray-50 rounded">
                <label className="flex items-center w-full cursor-pointer">
                  <input
                    type="radio"
                    name={`poll-${poll._id}`}
                    className="mr-2"
                    onChange={() => handleOptionSelect(poll._id, idx)}
                    checked={selectedOptions[poll._id] === idx}
                  />
                  <span className="text-gray-600">{option.text}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>Poll will expire by {new Date(poll.expirationDate).toLocaleDateString()}</span>
            <button 
              className="bg-orange-100 px-4 py-1 rounded text-orange-600 hover:bg-orange-200 transition-colors"
              onClick={() => handleSubmit(poll._id)}
            >
              Submit
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8">No Polls Available</div>
  );
};

const FeedbackContent = ({ feedbackList, onSubmitFeedback }) => {
  const [feedbackResponses, setFeedbackResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackChange = (feedbackId, text) => {
    setFeedbackResponses({
      ...feedbackResponses,
      [feedbackId]: text
    });
  };

  const handleSubmit = async (feedbackId) => {
    if (!feedbackResponses[feedbackId] || !feedbackResponses[feedbackId].trim()) {
      toast.error("Please enter your feedback before submitting");
      return;
    }

    setIsSubmitting(true);
    await onSubmitFeedback(feedbackId, feedbackResponses[feedbackId]);
    setIsSubmitting(false);
  };

  return feedbackList.length > 0 ? (
    <div className="space-y-6">
      {feedbackList.map((feedback) => (
        <div key={feedback._id} className="border rounded-lg p-4">
          <p className="text-gray-600 mb-4">{feedback.title}</p>
          <textarea
            className="w-full border rounded-lg p-3 min-h-32"
            placeholder="Write your opinion"
            value={feedbackResponses[feedback._id] || ""}
            onChange={(e) => handleFeedbackChange(feedback._id, e.target.value)}
          />
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>Feedback will be accepted until {new Date(feedback.expiresAt).toLocaleDateString()}</span>
            <button 
              className="bg-orange-100 px-4 py-1 rounded text-orange-600 hover:bg-orange-200 transition-colors disabled:opacity-50"
              onClick={() => handleSubmit(feedback._id)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8">No Feedback Questions Available</div>
  );
};

const EngagementDashboard = () => {
  const [activeTab, setActiveTab] = useState("poll");
  const [polls, setPolls] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [userPolls, setUserPolls] = useState([]);
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [
          pollsResponse, 
          feedbackResponse,
          userFeedbacksResponse 
        ] = await Promise.all([
          axiosInstance.get("/polls"),
          axiosInstance.get("/feedback/questions"),
          axiosInstance.get("/feedback/responses/me"),
        ]);
        console.log(pollsResponse)
        console.log(feedbackResponse) 
        console.log(userFeedbacksResponse)       
        setPolls(pollsResponse.data);
        setFeedbackList(feedbackResponse.data);
        // setUserPolls(userPollsResponse.data);
        setUserFeedbacks(userFeedbacksResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter out polls and feedback questions the user has already answered
  const availablePolls = polls.filter(
    (poll) => !userPolls.some((userPoll) => userPoll.pollId === poll._id)
  );
  
  const availableFeedback = feedbackList.filter(
    (feedback) => !userFeedbacks.some((userFeedback) => userFeedback.feedbackId._id === feedback._id)
  );
  

  const handleSubmitPoll = async (pollId, optionId) => {
    try {
      const response = await axiosInstance.put(`/polls/vote/${pollId}`, {
        optionId
      });
      
      if (response.status === 200) {
        toast.success("Your response has been recorded. Thank you!");
        
        // Update local state to reflect the submitted poll
        setUserPolls([...userPolls, { pollId, optionId }]);
      }
    } catch (err) {
      console.error("Failed to submit poll response:", err);
      toast.error("Failed to submit your response. Please try again.");
    }
  };

  const handleSubmitFeedback = async (feedbackId, feedbackText) => {
    try {
      const response = await axiosInstance.post("/feedback/responses", {
        feedbackId,
        response: feedbackText
      });
      
      if (response.status === 200) {
        toast.success("Your feedback has been submitted. Thank you!");
        
        // Update local state to reflect the submitted feedback
        setUserFeedbacks([...userFeedbacks, { feedbackId }]);
        return true;
      }
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      toast.error("Failed to submit your feedback. Please try again.");
      return false;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-4xl mx-auto">
        <Card className="w-full my-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeTab === "poll" ? "bg-red-200" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("poll")}
                >
                  Poll
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeTab === "feedback" ? "bg-red-200" : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("feedback")}
                >
                  Feedback
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mx-auto">
          <CardContent className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mb-2"></div>
                <p>Loading...</p>
              </div>
            ) : activeTab === "poll" ? (
              <PollContent polls={availablePolls} onSubmitPoll={handleSubmitPoll} />
            ) : (
              <FeedbackContent 
                feedbackList={availableFeedback} 
                onSubmitFeedback={handleSubmitFeedback} 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementDashboard;