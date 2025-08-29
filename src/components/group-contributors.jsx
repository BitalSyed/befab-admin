import { cn } from '@/lib/utils';
import { FaBug, FaSync, FaCreditCard, FaQuestionCircle } from 'react-icons/fa';

const tickets = [
  {
    icon: 'https://placehold.co/400',
    label: "Sarah Johnson",
    count: 'Runners Club',
    change: "124",
    color: "text-red-500",
  },
  {
    icon: 'https://placehold.co/400',
    label: "Michael Chen",
    count: 'Strength Training',
    change: "98",
    color: "text-green-500",
  },
  {
    icon: 'https://placehold.co/400',
    label: "David Wilson",
    count: 'Cycling Club',
    change: "87",
    color: "text-green-500",
  },
  {
    icon: 'https://placehold.co/400',
    label: "Alex Rodriguez",
    count: 'Healthy Eating',
    change: "76",
    color: "text-red-500",
  },
  {
    icon: 'https://placehold.co/400',
    label: "Emma Thompson",
    count: 'Runners Club',
    change: "65",
    color: "text-red-500",
  },
];

export default function Contributors({className}) {
  return (
    <div className={cn("bg-white shadow-md rounded-lg p-6", className)}>
      <h2 className="text-lg font-semibold mb-8 text-gray-800">Top Contributors</h2>
      <div className="space-y-5">
        {tickets.map((ticket, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={ticket.icon} className='rounded-full w-12' alt="" />
              <div className="text-gray-700">
                <div className="font-medium">{ticket.label}</div>
                <div className="text-sm text-gray-500">{ticket.count}</div>
              </div>
            </div>
            <div className={`text-sm font-semibold`}>{ticket.change} posts</div>
          </div>
        ))}
      </div>
    </div>
  );
}
