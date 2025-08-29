import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, Pencil, Trash2 } from "lucide-react";

export default function ModerationPanel() {
  return (
    <div>
      {/* Flagged Content */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold -mb-2">
          Moderation & Compliance
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 lg:p-4">
        <Card className="p-4">
          <div className="flex justify-between items-center -mb-2">
            <h2 className="font-semibold text-lg">Flagged Content</h2>
            <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-md">
              2 items
            </span>
          </div>

          <FlaggedItem
            title="Advanced HIIT Challenge"
            flaggedFor="Inappropriate content"
            flaggedBy="3"
            image="https://placehold.co/600x400"
          />

          <FlaggedItem
            title="Supplement Review"
            flaggedFor="Potentially misleading info"
            flaggedBy="2"
            image="https://placehold.co/600x400"
          />
        </Card>

        {/* Recent Admin Actions */}
        <Card className="p-4">
          <h2 className="font-semibold text-lg -mb-2">Recent Admin Actions</h2>

          <AdminAction
            type="upload"
            title='Video uploaded: "10-Minute Morning Energizer"'
            user="Sarah Johnson"
            date="June 28, 2023"
            time="10:24 AM"
          />
          <AdminAction
            type="publish"
            title='Video published: "Full Body Strength Workout"'
            user="John Smith"
            date="June 25, 2023"
            time="3:15 PM"
          />
          <AdminAction
            type="edit"
            title='Video edited: "Yoga for Flexibility"'
            user="Emily Parker"
            date="June 22, 2023"
            time="11:42 AM"
          />
          <AdminAction
            type="remove"
            title='Video removed: "Outdated Workout Routine"'
            user="John Smith"
            date="June 20, 2023"
            time="9:18 AM"
          />
        </Card>
      </div>
    </div>
  );
}

function FlaggedItem({ title, flaggedFor, flaggedBy, image }) {
  return (
    <div className="flex items-start gap-4 py-8 -mb-5 border-t">
      <img src={image} alt="" className="h-14 rounded object-cover" />
      <div className="flex-1">
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">
          Flagged for: {flaggedFor}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Flagged by: {flaggedBy} users
        </p>
      </div>
      <div className="flex gap-2 mt-auto">
        <Button variant="red" size="sm">
          Remove
        </Button>
        <Button
          variant="green"
          size="sm"
          className="text-green-600 border-green-400"
        >
          Approve
        </Button>
      </div>
    </div>
  );
}

function AdminAction({ type, title, user, date, time }) {
  const iconMap = {
    upload: <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.0998535" y="0.0698242" width="31.99" height="31.99" rx="15.995" fill="#DBEAFE"/>
<path d="M16.9736 11.804V18.4309C16.9736 18.9142 16.5832 19.3046 16.0999 19.3046C15.6166 19.3046 15.2261 18.9142 15.2261 18.4309V11.804L13.2219 13.8082C12.8806 14.1495 12.3264 14.1495 11.985 13.8082C11.6437 13.4669 11.6437 12.9126 11.985 12.5713L15.48 9.07629C15.8214 8.73499 16.3756 8.73499 16.7169 9.07629L20.2119 12.5713C20.5533 12.9126 20.5533 13.4669 20.2119 13.8082C19.8706 14.1495 19.3164 14.1495 18.975 13.8082L16.9736 11.804ZM10.8574 18.4309H14.3524C14.3524 19.3947 15.136 20.1784 16.0999 20.1784C17.0637 20.1784 17.8474 19.3947 17.8474 18.4309H21.3424C22.3062 18.4309 23.0899 19.2145 23.0899 20.1784V21.0521C23.0899 22.016 22.3062 22.7996 21.3424 22.7996H10.8574C9.89351 22.7996 9.10986 22.016 9.10986 21.0521V20.1784C9.10986 19.2145 9.89351 18.4309 10.8574 18.4309ZM20.9055 21.2706C21.0793 21.2706 21.246 21.2015 21.3689 21.0786C21.4918 20.9557 21.5608 20.7891 21.5608 20.6153C21.5608 20.4415 21.4918 20.2748 21.3689 20.1519C21.246 20.029 21.0793 19.9599 20.9055 19.9599C20.7317 19.9599 20.565 20.029 20.4421 20.1519C20.3192 20.2748 20.2502 20.4415 20.2502 20.6153C20.2502 20.7891 20.3192 20.9557 20.4421 21.0786C20.565 21.2015 20.7317 21.2706 20.9055 21.2706Z" fill="#2563EB"/>
</svg>
,
    publish: <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.0998535" y="0.0600586" width="31.99" height="31.99" rx="15.995" fill="#DCFCE7"/>
<path d="M21.9532 11.6929C22.2945 12.0342 22.2945 12.5884 21.9532 12.9296L14.9646 19.9182C14.6234 20.2594 14.0692 20.2594 13.728 19.9182L10.2337 16.4239C9.89247 16.0826 9.89247 15.5285 10.2337 15.1872C10.575 14.846 11.1291 14.846 11.4704 15.1872L14.3477 18.0618L20.7193 11.6929C21.0605 11.3517 21.6147 11.3517 21.9559 11.6929H21.9532Z" fill="#16A34A"/>
</svg>
,
    edit: <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.0998535" y="0.0600586" width="31.99" height="31.99" rx="15.995" fill="#FEF9C3"/>
<path d="M19.0133 9.33716L17.6918 10.6587L21.2414 14.2083L22.5629 12.8868C23.2456 12.2042 23.2456 11.0983 22.5629 10.4157L21.4871 9.33716C20.8045 8.65454 19.6987 8.65454 19.0161 9.33716H19.0133ZM17.0747 11.2758L10.71 17.6432C10.426 17.9272 10.2185 18.2794 10.1038 18.6644L9.13722 21.9492C9.06896 22.1813 9.13176 22.4298 9.30105 22.599C9.47034 22.7683 9.71881 22.8311 9.94817 22.7656L13.2329 21.799C13.6179 21.6843 13.9702 21.4768 14.2541 21.1929L20.6243 14.8254L17.0747 11.2758Z" fill="#CA8A04"/>
</svg>
,
    remove: <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.0998535" y="0.0498047" width="31.99" height="31.99" rx="15.995" fill="#FEE2E2"/>
<path d="M13.6706 9.28837L13.474 9.67875H10.8533C10.3701 9.67875 9.97974 10.0691 9.97974 10.5523C9.97974 11.0355 10.3701 11.4259 10.8533 11.4259H21.3362C21.8194 11.4259 22.2097 11.0355 22.2097 10.5523C22.2097 10.0691 21.8194 9.67875 21.3362 9.67875H18.7155L18.5189 9.28837C18.3715 8.99081 18.0685 8.80518 17.7381 8.80518H14.4513C14.121 8.80518 13.818 8.99081 13.6706 9.28837ZM21.3362 12.2995H10.8533L11.432 21.5539C11.4757 22.2445 12.049 22.7823 12.7397 22.7823H19.4498C20.1405 22.7823 20.7137 22.2445 20.7574 21.5539L21.3362 12.2995Z" fill="#DC2626"/>
</svg>
,
  };

  return (
    <div className="flex items-start gap-3 py-2 border-t">
      <div className="pt-1">{iconMap[type]}</div>
      <div className="text-sm">
        <p className="text-gray-900 font-bold">{title}</p>
        <p className="text-xs text-muted-foreground">
          by {user} • {date} • {time}
        </p>
      </div>
    </div>
  );
}
