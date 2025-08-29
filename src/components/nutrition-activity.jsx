import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Flag, Bell, Utensils, Check, Barcode } from "lucide-react";

const ActivityFeed = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Activity Feed */}
      <Card className="md:col-span-2">
        <CardHeader className="flex py-2 flex-row items-center justify-between">
          <CardTitle>Recent Activity Feed</CardTitle>
          <Button variant="link" className="text-sm text-blue-500 p-0 h-auto">View All</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              user: "Sarah Johnson",
              time: "5 min ago",
              avatar: "https://i.pravatar.cc/40?img=1",
              description: "Logged breakfast: Oatmeal with berries, Greek yogurt, and coffee",
              tags: ["425 calories", "18g protein", "62g carbs", "9g fat"],
              colors: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-yellow-100 text-yellow-800", "bg-red-100 text-red-800"]
            },
            {
              user: "Michael Chen",
              time: "22 min ago",
              avatar: "https://i.pravatar.cc/40?img=2",
              description: 'Added a new food: "Homemade Protein Smoothie" to the database',
              tags: ["Review", "Approve"],
              colors: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800"]
            },
            {
              user: "Flagged Food Item",
              time: "1 hour ago",
              avatar: null,
              icon: <Flag className="text-yellow-500 w-6 h-6" />,
              description: '"Chocolate Protein Bar" has been flagged for incorrect nutritional information',
              tags: ["Review", "Remove"],
              colors: ["bg-blue-100 text-blue-800", "bg-red-100 text-red-800"]
            },
            {
              user: "David Wilson",
              time: "2 hours ago",
              avatar: "https://i.pravatar.cc/40?img=3",
              description: 'Reached milestone: "30 Days of Consistent Meal Logging"',
              tags: ["Achievement Unlocked"],
              colors: ["bg-purple-100 text-purple-800"]
            },
            {
              user: "Emma Rodriguez",
              time: "3 hours ago",
              avatar: "https://i.pravatar.cc/40?img=4",
              description: "Logged dinner: Grilled salmon with quinoa and roasted vegetables",
              tags: ["520 calories", "38g protein", "45g carbs", "18g fat"],
              colors: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-yellow-100 text-yellow-800", "bg-red-100 text-red-800"]
            }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              {item.avatar ? (
                <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-full">
                  {item.icon}
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium">{item.user}</div>
                <div className="text-sm text-muted-foreground mb-2">{item.description}</div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.colors[j]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="md:col-span-1">
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
      </Card>
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
