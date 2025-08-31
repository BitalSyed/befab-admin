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

const Surveys = () => {
  const navigate=useNavigate()
   const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchCompetitions = async () => {
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
            setUsers(data); // assuming setUsers exists
            setData(data); // assuming setData exists
            console.log(data);
          }
        } catch (error) {
          console.error("Error fetching competitions:", error);
          toast.error("An error occurred. Please try again.");
        }
      };
  
      fetchCompetitions();
    }, []);
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
                  {/* Your SVG code remains the same */}
                  <svg width="110" height="44" viewBox="0 0 110 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1.23047" y="1.47998" width="107.52" height="41.46" rx="7.5" fill="white"/>
<rect x="1.23047" y="1.47998" width="107.52" height="41.46" rx="7.5" stroke="#D1D5DB"/>
<path d="M26.9805 14.71C26.9805 14.1568 26.5336 13.71 25.9805 13.71C25.4273 13.71 24.9805 14.1568 24.9805 14.71V22.2943L22.6867 20.0006C22.2961 19.61 21.6617 19.61 21.2711 20.0006C20.8805 20.3912 20.8805 21.0256 21.2711 21.4162L25.2711 25.4162C25.6617 25.8068 26.2961 25.8068 26.6867 25.4162L30.6867 21.4162C31.0773 21.0256 31.0773 20.3912 30.6867 20.0006C30.2961 19.61 29.6617 19.61 29.2711 20.0006L26.9805 22.2943V14.71ZM19.9805 24.71C18.8773 24.71 17.9805 25.6068 17.9805 26.71V27.71C17.9805 28.8131 18.8773 29.71 19.9805 29.71H31.9805C33.0836 29.71 33.9805 28.8131 33.9805 27.71V26.71C33.9805 25.6068 33.0836 24.71 31.9805 24.71H28.8086L27.393 26.1256C26.6117 26.9068 25.3461 26.9068 24.5648 26.1256L23.1523 24.71H19.9805ZM31.4805 26.46C31.6794 26.46 31.8701 26.539 32.0108 26.6796C32.1515 26.8203 32.2305 27.011 32.2305 27.21C32.2305 27.4089 32.1515 27.5996 32.0108 27.7403C31.8701 27.8809 31.6794 27.96 31.4805 27.96C31.2816 27.96 31.0908 27.8809 30.9501 27.7403C30.8095 27.5996 30.7305 27.4089 30.7305 27.21C30.7305 27.011 30.8095 26.8203 30.9501 26.6796C31.0908 26.539 31.2816 26.46 31.4805 26.46Z" fill="#374151"/>
<path d="M43.3099 27.7202V16.0839H50.6054V17.5952H45.0656V21.1407H50.2247V22.6464H45.0656V26.2089H50.6736V27.7202H43.3099ZM54.1551 18.9929L56.0812 22.3907L58.0244 18.9929H59.8824L57.1608 23.3566L59.9051 27.7202H58.0471L56.0812 24.4589L54.121 27.7202H52.2574L54.9733 23.3566L52.2915 18.9929H54.1551ZM61.6267 30.9929V18.9929H63.2858V20.4077H63.4278C63.5263 20.2259 63.6684 20.0157 63.854 19.777C64.0396 19.5384 64.2971 19.3301 64.6267 19.152C64.9562 18.9702 65.3918 18.8793 65.9335 18.8793C66.6381 18.8793 67.2668 19.0573 67.8199 19.4134C68.3729 19.7695 68.8066 20.2827 69.121 20.9532C69.4392 21.6236 69.5983 22.4304 69.5983 23.3736C69.5983 24.3168 69.4411 25.1255 69.1267 25.7998C68.8123 26.4702 68.3805 26.9873 67.8312 27.3509C67.282 27.7107 66.6551 27.8907 65.9506 27.8907C65.4202 27.8907 64.9865 27.8017 64.6494 27.6236C64.3161 27.4456 64.0547 27.2373 63.8653 26.9986C63.6759 26.76 63.5301 26.5479 63.4278 26.3623H63.3256V30.9929H61.6267ZM63.2915 23.3566C63.2915 23.9702 63.3805 24.5081 63.5585 24.9702C63.7365 25.4323 63.9941 25.7941 64.3312 26.0554C64.6684 26.313 65.0812 26.4418 65.5699 26.4418C66.0774 26.4418 66.5017 26.3073 66.8426 26.0384C67.1835 25.7657 67.4411 25.3964 67.6153 24.9304C67.7934 24.4645 67.8824 23.9399 67.8824 23.3566C67.8824 22.7808 67.7952 22.2638 67.621 21.8054C67.4506 21.3471 67.193 20.9854 66.8483 20.7202C66.5074 20.4551 66.0812 20.3225 65.5699 20.3225C65.0774 20.3225 64.6608 20.4494 64.3199 20.7032C63.9827 20.957 63.7271 21.3111 63.5528 21.7657C63.3786 22.2202 63.2915 22.7505 63.2915 23.3566ZM75.1778 27.8964C74.3596 27.8964 73.6456 27.7089 73.0358 27.3339C72.4259 26.9589 71.9524 26.4342 71.6153 25.76C71.2782 25.0857 71.1096 24.2979 71.1096 23.3964C71.1096 22.491 71.2782 21.6994 71.6153 21.0214C71.9524 20.3433 72.4259 19.8168 73.0358 19.4418C73.6456 19.0668 74.3596 18.8793 75.1778 18.8793C75.996 18.8793 76.71 19.0668 77.3199 19.4418C77.9297 19.8168 78.4032 20.3433 78.7403 21.0214C79.0774 21.6994 79.246 22.491 79.246 23.3964C79.246 24.2979 79.0774 25.0857 78.7403 25.76C78.4032 26.4342 77.9297 26.9589 77.3199 27.3339C76.71 27.7089 75.996 27.8964 75.1778 27.8964ZM75.1835 26.4702C75.7138 26.4702 76.1532 26.3301 76.5017 26.0498C76.8502 25.7695 77.1077 25.3964 77.2744 24.9304C77.4449 24.4645 77.5301 23.9513 77.5301 23.3907C77.5301 22.8339 77.4449 22.3225 77.2744 21.8566C77.1077 21.3869 76.8502 21.01 76.5017 20.7259C76.1532 20.4418 75.7138 20.2998 75.1835 20.2998C74.6494 20.2998 74.2062 20.4418 73.854 20.7259C73.5055 21.01 73.246 21.3869 73.0756 21.8566C72.9089 22.3225 72.8256 22.8339 72.8256 23.3907C72.8256 23.9513 72.9089 24.4645 73.0756 24.9304C73.246 25.3964 73.5055 25.7695 73.854 26.0498C74.2062 26.3301 74.6494 26.4702 75.1835 26.4702ZM81.1423 27.7202V18.9929H82.7844V20.3793H82.8753C83.0344 19.9096 83.3147 19.5403 83.7162 19.2714C84.1215 18.9986 84.5798 18.8623 85.0912 18.8623C85.1972 18.8623 85.3222 18.866 85.4662 18.8736C85.6139 18.8812 85.7294 18.8907 85.8128 18.902V20.527C85.7446 20.5081 85.6234 20.4873 85.4491 20.4645C85.2749 20.438 85.1006 20.4248 84.9264 20.4248C84.5249 20.4248 84.1669 20.51 83.8525 20.6804C83.5419 20.8471 83.2957 21.0801 83.1139 21.3793C82.9321 21.6748 82.8412 22.0119 82.8412 22.3907V27.7202H81.1423ZM91.8724 18.9929V20.3566H87.1054V18.9929H91.8724ZM88.3838 16.902H90.0827V25.1577C90.0827 25.4873 90.1319 25.7354 90.2304 25.902C90.3289 26.0649 90.4558 26.1767 90.6111 26.2373C90.7702 26.2941 90.9425 26.3225 91.1281 26.3225C91.2645 26.3225 91.3838 26.313 91.4861 26.2941C91.5883 26.2751 91.6679 26.26 91.7247 26.2486L92.0315 27.652C91.933 27.6899 91.7929 27.7278 91.6111 27.7657C91.4292 27.8073 91.202 27.8301 90.9292 27.8339C90.4823 27.8414 90.0656 27.7619 89.6792 27.5952C89.2929 27.4285 88.9804 27.171 88.7417 26.8225C88.5031 26.474 88.3838 26.0365 88.3838 25.51V16.902Z" fill="#374151"/>
</svg>

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
                    />
                  </div>
      
                  {/* Fixed Select components */}
                  <Select>
                    <SelectTrigger className="w-[150px] text-sm">
                      <SelectValue placeholder="Status: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Status: All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
      
                  <Select>
                    <SelectTrigger className="w-[150px] text-sm">
                      <SelectValue placeholder="Duration: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Duration: All</SelectItem>
                      <SelectItem value="user1">User 1</SelectItem>
                      <SelectItem value="user2">User 2</SelectItem>
                    </SelectContent>
                  </Select>
      
                  <Select>
                    <SelectTrigger className="w-[180px] text-sm">
                      <SelectValue placeholder="Sort By: Newest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Sort By: Newest</SelectItem>
                      <SelectItem value="user1">User 1</SelectItem>
                      <SelectItem value="user2">User 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <SurveyTables data={data}/>
    </div>
  )
}

export default Surveys
