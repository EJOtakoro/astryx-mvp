import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import AstryxLogo from '../components/AstryxLogo';
import { UserFeedback, UserResponses } from '@shared/schema';

const AdminDashboard: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [feedbackData, setFeedbackData] = useState<UserFeedback[]>([]);
  const [responsesData, setResponsesData] = useState<UserResponses[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast({
        title: 'Authentication required',
        description: 'Please login to access the admin dashboard',
        variant: 'destructive',
      });
      setLocation('/admin/login');
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch feedback data
      const feedbackResponse = await fetch('/api/admin/feedback', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!feedbackResponse.ok) {
        throw new Error('Failed to fetch feedback data');
      }
      
      const feedbackResult = await feedbackResponse.json();
      setFeedbackData(feedbackResult);
      
      // Fetch responses data
      const responsesResponse = await fetch('/api/admin/responses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!responsesResponse.ok) {
        throw new Error('Failed to fetch responses data');
      }
      
      const responsesResult = await responsesResponse.json();
      setResponsesData(responsesResult);
      
    } catch (error) {
      toast({
        title: 'Error fetching data',
        description: 'Please try again or contact support',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    setLocation('/admin/login');
  };

  // Format date for display
  const formatDate = (dateString: Date | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <AstryxLogo size="small" />
            <h1 className="ml-3 text-xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Tabs defaultValue="feedback" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="feedback">User Feedback</TabsTrigger>
              <TabsTrigger value="responses">User Responses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>User Feedback</CardTitle>
                  <CardDescription>
                    View feedback ratings and comments from users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading feedback data...</div>
                  ) : feedbackData.length === 0 ? (
                    <div className="text-center py-4">No feedback data available</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>User Type</TableHead>
                            <TableHead>Q1</TableHead>
                            <TableHead>Q2</TableHead>
                            <TableHead>Q3</TableHead>
                            <TableHead>Q4</TableHead>
                            <TableHead>Q5</TableHead>
                            <TableHead>Q6</TableHead>
                            <TableHead>Additional Feedback</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {feedbackData.map((feedback) => (
                            <TableRow key={feedback.id}>
                              <TableCell>{feedback.email || 'N/A'}</TableCell>
                              <TableCell>{feedback.userType || 'N/A'}</TableCell>
                              <TableCell>{feedback.feedback1}</TableCell>
                              <TableCell>{feedback.feedback2}</TableCell>
                              <TableCell>{feedback.feedback3}</TableCell>
                              <TableCell>{feedback.feedback4}</TableCell>
                              <TableCell>{feedback.feedback5}</TableCell>
                              <TableCell>{feedback.feedback6}</TableCell>
                              <TableCell className="max-w-xs truncate">
                                {feedback.additionalFeedback || 'None'}
                              </TableCell>
                              <TableCell>{formatDate(feedback.createdAt)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="responses">
              <Card>
                <CardHeader>
                  <CardTitle>User Responses</CardTitle>
                  <CardDescription>
                    View responses to AI-generated questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-4">Loading response data...</div>
                  ) : responsesData.length === 0 ? (
                    <div className="text-center py-4">No response data available</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Question 1</TableHead>
                            <TableHead>Question 2</TableHead>
                            <TableHead>Question 3</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {responsesData.map((response) => (
                            <TableRow key={response.id}>
                              <TableCell>{response.email || 'N/A'}</TableCell>
                              <TableCell className="max-w-xs truncate">
                                {response.answer1 || 'No response'}
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                {response.answer2 || 'No response'}
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                {response.answer3 || 'No response'}
                              </TableCell>
                              <TableCell>{formatDate(response.createdAt)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;