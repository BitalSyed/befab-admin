import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SurveyTables from '@/components/survey-table';
import { useNavigate } from 'react-router-dom';
import { API_URL, getCookie } from '@/components/cookieUtils';
import { toast } from 'react-toastify';

const Surveys = ({d}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/surveys`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          },
        });

        const data = await response.json();
        if (data.error) {
          toast.error(data.error);
        } else {
          setUsers(data);
          setData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchSurveys();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${API_URL}/admin/users?token=${getCookie("skillrextech_auth")}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        const usersData = await response.json();
        if (usersData.error) {
          toast.error(usersData.error);
        } else {
          setAllUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  // Filter & sort logic
  useEffect(() => {
    let tempData = [...data];

    // Filter by user
    if (selectedUser !== 'all') {
      tempData = tempData.filter(survey =>
        survey.responses.some(r => r.user === selectedUser)
      );
    }

    // Filter by search
    if (searchTerm) {
      tempData = tempData.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by newest or oldest
    tempData.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

    setFilteredData(tempData);
  }, [searchTerm, selectedUser, sortBy, data]);

  return (
    <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2 justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Survey Management</h1>
            <p className="text-sm text-gray-600">
              Create, edit, and manage surveys for your users
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={()=>navigate('/new-survey')} className="bg-[#862633] text-white ml-auto py-5.25">
              <Plus className="w-4 h-4" />
              Create Survey
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-4 px-6 rounded-md shadow-sm">
          <div className="flex flex-wrap gap-2 items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search surveys by title or content..."
                className="pl-10 w-80 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter by user */}
            <Select onValueChange={setSelectedUser}>
              <SelectTrigger className="w-[150px] text-sm">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {allUsers.map(user => (
                  <SelectItem key={user._id} value={user._id}>{user.username}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] text-sm">
                <SelectValue placeholder="Sort By: Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <SurveyTables data={filteredData} users={users} allusers={allUsers} d={d}/>
    </div>
  );
};

export default Surveys;
