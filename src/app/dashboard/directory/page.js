"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axiosInstance from '@/utils/axiosInstance';
import IndustryForm from './form';

// This component will be used for both creating new and editing existing industries
export default function IndustryPage() {
  
  const [industry, setIndustry] = useState(null);
  const [error, setError] = useState(null);
  const id = localStorage.getItem('industryId'); // Get the industry ID from local storage
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // If we have an ID, fetch the industry data
    console.log('Industry ID from local storage:', id);
    if (id) {
      console.log('Fetching industry with ID:', id);
      const fetchIndustry = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(`/industries/${id}`);
          setIndustry(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Failed to fetch industry', err);
          setError('Failed to load industry data. Please try again.');
          setLoading(false);
        }
      };

      fetchIndustry();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <>
        <IndustryForm initialData={industry} />
      
    </>
  );
}

