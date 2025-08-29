import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Plus, Check, Bell, Download } from "lucide-react";

export default function ActivityFeedDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section: Activity Feed */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity Feed</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <Input
              className="w-32 h-8 text-sm"
              value="All Activities"
              readOnly
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted text-muted-foreground text-left">
                <tr className="border-b">
                  <th className="px-6 py-2">USER</th>
                  <th className="px-6 py-2">ACTIVITY</th>
                  <th className="px-6 py-2">METRICS</th>
                  <th className="px-6 py-2">TIME</th>
                  <th className="px-6 py-2">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    user: "Sarah Johnson",
                    id: 58492,
                    activity: "HIIT Workout",
                    category: "Cardio & Strength",
                    metrics: "45 min • 385 cal\nHeart rate: 142 bpm",
                    time: "10 minutes ago",
                    status: "G",
                    avatar: "/avatars/01.png",
                  },
                  {
                    user: "Michael Chen",
                    id: 32587,
                    activity: "5K Run",
                    category: "Outdoor",
                    metrics: "28 min • 320 cal\nPace: 5:36 min/km",
                    time: "25 minutes ago",
                    status: "F",
                    avatar: "/avatars/02.png",
                  },
                  {
                    user: "Emma Wilson",
                    id: 41936,
                    activity: "Yoga Session",
                    category: "Flexibility",
                    metrics: "60 min • 180 cal\nHeart rate: 85 bpm",
                    time: "42 minutes ago",
                    status: "G",
                    avatar: "/avatars/03.png",
                  },
                  {
                    user: "David Garcia",
                    id: 27845,
                    activity: "Weight Training",
                    category: "Upper Body",
                    metrics: "75 min • 450 cal\nHeart rate: 135 bpm",
                    time: "1 hour ago",
                    status: "G",
                    avatar: "/avatars/04.png",
                  },
                  {
                    user: "Jessica Lee",
                    id: 36291,
                    activity: "10K Steps",
                    category: "Walking",
                    metrics: "10,000 steps • 420 cal\nDistance: 7.2 km",
                    time: "1.5 hours ago",
                    status: "M",
                    avatar: "/avatars/05.png",
                  },
                ].map((item, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                      <img src={item.avatar} className="w-8 h-8 rounded-full" />
                      <div>
                        <div>{item.user}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {item.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{item.activity}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-pre-line">
                      {item.metrics}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{item.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right px-6 py-4 text-sm text-blue-600 font-medium cursor-pointer">
            View all activity →
          </div>
        </CardContent>
      </Card>

      {/* Right Section: AI Data Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              width="37"
              height="41"
              viewBox="0 0 37 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.719971"
                y="0.970215"
                width="35.96"
                height="39.96"
                rx="8"
                fill="#DBEAFE"
              />
              <path
                d="M18.6902 12.4663C19.2428 12.4663 19.6892 12.9127 19.6892 13.4653V15.4634H23.4356C24.6781 15.4634 25.6834 16.4687 25.6834 17.7112V26.2029C25.6834 27.4454 24.6781 28.4507 23.4356 28.4507H13.9448C12.7023 28.4507 11.697 27.4454 11.697 26.2029V17.7112C11.697 16.4687 12.7023 15.4634 13.9448 15.4634H17.6912V13.4653C17.6912 12.9127 18.1376 12.4663 18.6902 12.4663ZM15.1936 24.4546C14.9189 24.4546 14.6941 24.6794 14.6941 24.9541C14.6941 25.2289 14.9189 25.4536 15.1936 25.4536H16.1926C16.4674 25.4536 16.6922 25.2289 16.6922 24.9541C16.6922 24.6794 16.4674 24.4546 16.1926 24.4546H15.1936ZM18.1907 24.4546C17.916 24.4546 17.6912 24.6794 17.6912 24.9541C17.6912 25.2289 17.916 25.4536 18.1907 25.4536H19.1897C19.4644 25.4536 19.6892 25.2289 19.6892 24.9541C19.6892 24.6794 19.4644 24.4546 19.1897 24.4546H18.1907ZM21.1878 24.4546C20.913 24.4546 20.6883 24.6794 20.6883 24.9541C20.6883 25.2289 20.913 25.4536 21.1878 25.4536H22.1868C22.4615 25.4536 22.6863 25.2289 22.6863 24.9541C22.6863 24.6794 22.4615 24.4546 22.1868 24.4546H21.1878ZM16.9419 20.4585C16.9419 20.1273 16.8103 19.8097 16.5761 19.5755C16.342 19.3413 16.0243 19.2097 15.6931 19.2097C15.3619 19.2097 15.0443 19.3413 14.8101 19.5755C14.5759 19.8097 14.4443 20.1273 14.4443 20.4585C14.4443 20.7897 14.5759 21.1073 14.8101 21.3415C15.0443 21.5757 15.3619 21.7073 15.6931 21.7073C16.0243 21.7073 16.342 21.5757 16.5761 21.3415C16.8103 21.1073 16.9419 20.7897 16.9419 20.4585ZM21.6873 21.7073C22.0185 21.7073 22.3361 21.5757 22.5703 21.3415C22.8045 21.1073 22.9361 20.7897 22.9361 20.4585C22.9361 20.1273 22.8045 19.8097 22.5703 19.5755C22.3361 19.3413 22.0185 19.2097 21.6873 19.2097C21.3561 19.2097 21.0384 19.3413 20.8043 19.5755C20.5701 19.8097 20.4385 20.1273 20.4385 20.4585C20.4385 20.7897 20.5701 21.1073 20.8043 21.3415C21.0384 21.5757 21.3561 21.7073 21.6873 21.7073ZM10.1985 19.4595H10.698V25.4536H10.1985C9.37117 25.4536 8.69995 24.7824 8.69995 23.9551V20.958C8.69995 20.1307 9.37117 19.4595 10.1985 19.4595ZM27.1819 19.4595C28.0092 19.4595 28.6805 20.1307 28.6805 20.958V23.9551C28.6805 24.7824 28.0092 25.4536 27.1819 25.4536H26.6824V19.4595H27.1819Z"
                fill="#2563EB"
              />
            </svg>
            AI Data Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Most Logged */}
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-2">
              Most Logged Activities
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Running</span>
                <span>32%</span>
              </div>
              <Progress value={32} CustomName="bg-blue-500" className="h-2" />
              <div className="flex justify-between">
                <span>Weight Training</span>
                <span>28%</span>
              </div>
              <Progress value={28} CustomName="bg-blue-500" className="h-2" />
              <div className="flex justify-between">
                <span>Yoga</span>
                <span>18%</span>
              </div>
              <Progress value={18} CustomName="bg-blue-500" className="h-2" />
            </div>
          </div>

          {/* Trending Types */}
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-2">
              Trending Exercise Types
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex gap-3">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.719971"
                    y="0.0102539"
                    width="31.99"
                    height="31.99"
                    rx="15.995"
                    fill="#DCFCE7"
                  />
                  <path
                    d="M19.7057 9.01495C19.7057 8.61769 19.5479 8.2367 19.267 7.9558C18.9861 7.6749 18.6051 7.51709 18.2078 7.51709C17.8106 7.51709 17.4296 7.6749 17.1487 7.9558C16.8678 8.2367 16.71 8.61769 16.71 9.01495C16.71 9.4122 16.8678 9.79319 17.1487 10.0741C17.4296 10.355 17.8106 10.5128 18.2078 10.5128C18.6051 10.5128 18.9861 10.355 19.267 10.0741C19.5479 9.79319 19.7057 9.4122 19.7057 9.01495ZM13.6425 12.9936C13.9514 12.6847 14.3727 12.5099 14.8127 12.5099C14.872 12.5099 14.9313 12.5131 14.9874 12.5193L14.0138 15.4433C13.7236 16.317 14.0669 17.2781 14.8501 17.7681L17.54 19.45L16.7474 22.2211C16.5945 22.7515 16.9034 23.3039 17.4339 23.4568C17.9644 23.6097 18.5168 23.3008 18.6697 22.7703L19.5653 19.6373C19.7494 18.9944 19.4841 18.3079 18.9193 17.9553L17.1468 16.8475L18.1111 14.2762L18.2702 14.66C18.7383 15.7771 19.8274 16.5042 21.0382 16.5042H21.7028C22.2552 16.5042 22.7014 16.058 22.7014 15.5057C22.7014 14.9533 22.2552 14.5071 21.7028 14.5071H21.0382C20.6356 14.5071 20.2705 14.2637 20.1176 13.8923L19.921 13.4243C19.4654 12.329 18.5448 11.4927 17.409 11.1432L15.8893 10.6751C15.5429 10.569 15.1809 10.5128 14.8158 10.5128C13.8484 10.5128 12.9185 10.8966 12.2351 11.5831L11.5112 12.304C11.1211 12.6941 11.1211 13.3275 11.5112 13.7176C11.9012 14.1077 12.5347 14.1077 12.9248 13.7176L13.6456 12.9968L13.6425 12.9936ZM12.5659 18.5014H10.7185C10.1662 18.5014 9.71997 18.9476 9.71997 19.4999C9.71997 20.0523 10.1662 20.4985 10.7185 20.4985H12.8904C13.4833 20.4985 14.0201 20.149 14.2604 19.6092L14.6192 18.8009L14.3228 18.6137C13.7767 18.2736 13.371 17.7774 13.1401 17.2126L12.5659 18.5014Z"
                    fill="#16A34A"
                  />
                </svg>
                <div>
                  HIIT Workouts <br />
                  <span className="text-green-600 text-xs">+15% this week</span>
                </div>
              </li>
              <li className="flex gap-3">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.719971"
                    width="31.99"
                    height="31.99"
                    rx="15.995"
                    fill="#F3E8FF"
                  />
                  <path
                    d="M16.4505 8.50488C16.0352 8.50488 15.7012 8.83893 15.7012 9.25415C15.7012 9.66937 16.0352 10.0034 16.4505 10.0034H17.2528L18.333 12.0015H13.6688L12.8134 10.8151C12.6729 10.6184 12.445 10.5029 12.2046 10.5029H10.4563C10.0411 10.5029 9.70704 10.837 9.70704 11.2522C9.70704 11.6674 10.0411 12.0015 10.4563 12.0015H11.8206L12.5106 12.9599L11.6801 14.6177C11.3679 14.5396 11.0401 14.499 10.7061 14.499C8.49884 14.499 6.70996 16.2879 6.70996 18.4951C6.70996 20.7024 8.49884 22.4912 10.7061 22.4912C12.7447 22.4912 14.4243 20.9646 14.6709 18.9946H16.2007C16.4661 18.9946 16.7096 18.8542 16.8469 18.6263L19.4944 14.1463L20.1718 15.3982C19.2727 16.1318 18.6983 17.2464 18.6983 18.4951C18.6983 20.7024 20.4871 22.4912 22.6944 22.4912C24.9016 22.4912 26.6905 20.7024 26.6905 18.4951C26.6905 16.2879 24.9016 14.499 22.6944 14.499C22.2729 14.499 21.867 14.5646 21.4862 14.6863L18.4298 9.02937C18.2549 8.70469 17.9178 8.50488 17.5494 8.50488H16.4505ZM21.0272 16.9872L22.0356 18.851C22.2323 19.2163 22.6881 19.3505 23.0503 19.1539C23.4124 18.9572 23.5498 18.5014 23.3531 18.1392L22.3447 16.2754C22.4571 16.2567 22.5757 16.2473 22.6944 16.2473C23.9369 16.2473 24.9422 17.2526 24.9422 18.4951C24.9422 19.7377 23.9369 20.7429 22.6944 20.7429C21.4518 20.7429 20.4466 19.7377 20.4466 18.4951C20.4466 17.9144 20.6651 17.3868 21.0272 16.9872ZM10.8684 18.9946H12.8977C12.6698 19.9968 11.7738 20.7429 10.7061 20.7429C9.46352 20.7429 8.45825 19.7377 8.45825 18.4951C8.45825 17.2526 9.46352 16.2473 10.7061 16.2473C10.7591 16.2473 10.8122 16.2504 10.8653 16.2536L10.1098 17.7677C9.82879 18.3328 10.2378 18.9978 10.8684 18.9978V18.9946ZM11.9205 17.4961L13.5033 14.3336L15.7792 17.493L15.7761 17.4961H11.9174H11.9205ZM14.749 13.5H18.1332L16.6066 16.085L14.7459 13.5H14.749Z"
                    fill="#9333EA"
                  />
                </svg>
                <div>
                  Indoor Cycling <br />
                  <span className="text-green-600 text-xs">+12% this week</span>
                </div>
              </li>
              <li className="flex gap-3">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.719971"
                    y="-0.00976562"
                    width="31.99"
                    height="31.99"
                    rx="15.995"
                    fill="#FEF9C3"
                  />
                  <path
                    d="M9.70704 9.49414C9.70704 8.94156 10.1535 8.49512 10.7061 8.49512H11.7051C12.2577 8.49512 12.7041 8.94156 12.7041 9.49414V14.4893V16.4873V21.4824C12.7041 22.035 12.2577 22.4815 11.7051 22.4815H10.7061C10.1535 22.4815 9.70704 22.035 9.70704 21.4824V19.4844H8.70801C8.15543 19.4844 7.70899 19.038 7.70899 18.4854V16.4873C7.1564 16.4873 6.70996 16.0409 6.70996 15.4883C6.70996 14.9357 7.1564 14.4893 7.70899 14.4893V12.4912C7.70899 11.9386 8.15543 11.4922 8.70801 11.4922H9.70704V9.49414ZM23.6934 9.49414V11.4922H24.6924C25.245 11.4922 25.6914 11.9386 25.6914 12.4912V14.4893C26.244 14.4893 26.6905 14.9357 26.6905 15.4883C26.6905 16.0409 26.244 16.4873 25.6914 16.4873V18.4854C25.6914 19.038 25.245 19.4844 24.6924 19.4844H23.6934V21.4824C23.6934 22.035 23.2469 22.4815 22.6944 22.4815H21.6953C21.1427 22.4815 20.6963 22.035 20.6963 21.4824V16.4873V14.4893V9.49414C20.6963 8.94156 21.1427 8.49512 21.6953 8.49512H22.6944C23.2469 8.49512 23.6934 8.94156 23.6934 9.49414ZM19.6973 14.4893V16.4873H13.7031V14.4893H19.6973Z"
                    fill="#CA8A04"
                  />
                </svg>
                <div>
                  Functional Training <br />
                  <span className="text-green-600 text-xs">+8% this week</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Global Trends */}
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-2">
              Global Fitness Trends
            </p>
            <p className="text-sm text-muted-foreground">
              AI analysis shows increasing popularity in short, high-intensity
              workouts and recovery-focused activities. Users achieving 20%
              better results when combining strength training with mobility
              work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
