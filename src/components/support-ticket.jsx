import { cn } from '@/lib/utils';
import { FaBug, FaSync, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const tickets = [
  {
    icon: <FaBug className="text-red-500 text-lg bg-red-100 rounded-full box-border w-8 h-8 p-2" />,
    label: "App Crashes",
    count: 12,
    change: "+8%",
    color: "text-red-500",
  },
  {
    icon: <FaSync className="text-yellow-400 text-lg bg-yellow-100 rounded-full box-border w-8 h-8 p-2" />,
    label: "Sync Issues",
    count: 8,
    change: "-3%",
    color: "text-green-500",
  },
  {
    icon: <FaCreditCard className="text-blue-500 text-lg bg-blue-100 rounded-full box-border w-8 h-8 p-2" />,
    label: "Billing Issues",
    count: 5,
    change: "-12%",
    color: "text-green-500",
  },
  {
    icon: <FaQuestionCircle className="text-purple-400 text-lg bg-purple-100 rounded-full box-border w-8 h-8 p-2" />,
    label: "Feature Requests",
    count: 24,
    change: "+15%",
    color: "text-red-500",
  },
];

export default function SupportTicket({className}) {
  return (
    <div className={cn("bg-white shadow-md rounded-lg p-6", className)}>
      <h2 className="text-lg font-semibold mb-8 text-gray-800">Support Tickets</h2>
      <div className="space-y-5">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {ticket.icon}
              <div className="text-gray-700">
                <div className="font-medium">{ticket.label}</div>
                <div className="text-sm text-gray-500">{ticket.count} open tickets</div>
              </div>
            </div>
            <div className={`text-sm font-semibold ${ticket.color}`}>{ticket.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
