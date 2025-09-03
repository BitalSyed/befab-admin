import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Flag, Bell, Utensils, Check, Barcode } from "lucide-react";

const ActivityFeed = ({data}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Activity Feed */}
      <Card className="md:col-span-3">
        <CardHeader className="flex py-2 flex-row items-center justify-between">
          <CardTitle>Recent Activity Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data&&data.leaderboard?.users.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-1">
                <div className="font-medium">{item._id?.username}</div>
              </div>
                <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-500`}
                    >
                      Meals {item.totalMeals}
                    </span>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {/* <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="py-2">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <QuickActionButton icon={<Plus className="w-4 h-4" />} label="Add New Food" bg="bg-blue-100" text="text-blue-900" />
          <QuickActionButton icon={<Barcode className="w-4 h-4" />} label="Approve Barcode Scans" bg="bg-green-100" text="text-green-900" badge="12" />
          <QuickActionButton icon={<Flag className="w-4 h-4" />} label="Review Flagged Foods" bg="bg-yellow-100" text="text-yellow-900" badge="5" />
          <QuickActionButton icon={<Bell className="w-4 h-4" />} label="Send Nutrition Reminder" bg="bg-purple-100" text="text-purple-900" />
          <QuickActionButton icon={<Utensils className="w-4 h-4" />} label="Create Meal Template" bg="bg-orange-100" text="text-orange-900" />
        </CardContent>
      </Card> */}
    </div>
  );
};

const QuickActionButton = ({ icon, label, bg, text, badge }) => (
  <div className={`flex items-center justify-between px-4 py-3 rounded-lg ${bg} ${text}`}>
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="text-xs bg-white text-gray-800 rounded-full px-2 py-0.5 font-semibold">
          {badge}
        </span>
      )}
      <ArrowRight className="w-4 h-4 opacity-60" />
    </div>
  </div>
);

export default ActivityFeed;
