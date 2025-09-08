import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { API_URL, getCookie } from "./cookieUtils";
import { toast } from "react-toastify";

// big pool of possible goals
const goalPool = [
  {
    id: "1",
    category: "steps",
    goal: "Walk 12,000 steps daily",
    reason: "Supports cardiovascular health.",
    milestone: 12000,
    duration: 30,
  },
  {
    id: "2",
    category: "steps",
    goal: "Hit 8,000 steps before noon",
    reason: "Boosts morning metabolism.",
    milestone: 8000,
    duration: 15,
  },
  {
    id: "3",
    category: "steps",
    goal: "Walk 100,000 steps weekly",
    reason: "Builds long-term consistency.",
    milestone: 100000,
    duration: 7,
  },
  {
    id: "4",
    category: "distance",
    goal: "Run 3.1 miles three times a week", // 5 km ≈ 3.1 miles
    reason: "Improves endurance.",
    milestone: 5000,
    duration: 21,
  },
  {
    id: "5",
    category: "distance",
    goal: "Cycle 12.4 miles every weekend", // 20 km ≈ 12.4 miles
    reason: "Increases stamina.",
    milestone: 20000,
    duration: 28,
  },
  {
    id: "6",
    category: "distance",
    goal: "Swim 1.24 miles weekly", // 2 km ≈ 1.24 miles
    reason: "Boosts lung capacity.",
    milestone: 2000,
    duration: 30,
  },
  {
    id: "7",
    category: "calories_burned",
    goal: "Burn 500 kcal daily",
    reason: "Aligns with weight loss goal.",
    milestone: 500,
    duration: 30,
  },
  {
    id: "8",
    category: "calories_burned",
    goal: "Burn 3,000 kcal weekly",
    reason: "Accelerates fat loss.",
    milestone: 3000,
    duration: 7,
  },
  {
    id: "9",
    category: "calories_burned",
    goal: "Add 2 cardio sessions weekly",
    reason: "Improves heart health.",
    milestone: 2,
    duration: 14,
  },
  {
    id: "10",
    category: "calories_taken",
    goal: "Limit intake to 1,900 kcal/day",
    reason: "Supports gradual fat loss.",
    milestone: 1900,
    duration: 30,
  },
  {
    id: "11",
    category: "calories_taken",
    goal: "Eat 3 balanced meals daily",
    reason: "Supports steady energy levels and prevents overeating.",
    milestone: 3,
    duration: 30,
  },
  {
    id: "12",
    category: "calories_taken",
    goal: "Eat 5 servings of vegetables daily",
    reason: "Boosts micronutrient balance.",
    milestone: 5,
    duration: 30,
  },
  {
    id: "13",
    category: "calories_taken",
    goal: "Increase protein to 130g/day",
    reason: "Supports muscle growth.",
    milestone: 130,
    duration: 30,
  },
  {
    id: "14",
    category: "water_intake",
    goal: "Drink 3 liters of water daily",
    reason: "Improves focus & hydration.",
    milestone: 3000,
    duration: 30,
  },
  {
    id: "15",
    category: "water_intake",
    goal: "Drink a glass every 2 hours",
    reason: "Creates hydration habit.",
    milestone: 250,
    duration: 14,
  },
  {
    id: "16",
    category: "water_intake",
    goal: "Start mornings with 500ml water",
    reason: "Kickstarts hydration.",
    milestone: 500,
    duration: 30,
  },
  {
    id: "17",
    category: "water_intake",
    goal: "Reach 2L before 6 PM",
    reason: "Avoids late-night dehydration.",
    milestone: 2000,
    duration: 30,
  },
  {
    id: "18",
    category: "steps",
    goal: "Take 15,000 steps on weekends",
    reason: "Balances sedentary lifestyle.",
    milestone: 15000,
    duration: 8,
  },
  {
    id: "19",
    category: "distance",
    goal: "Walk 4 km during lunch breaks",
    reason: "Counters long sitting hours.",
    milestone: 4000,
    duration: 21,
  },
  {
    id: "20",
    category: "calories_taken",
    goal: "Track all meals for 30 days",
    reason: "Improves nutrition awareness.",
    milestone: 30,
    duration: 30,
  },
];

const handleSubmit = async (e) => {
  try {
    function a(b) {
      let k;
      switch (b) {
        case "steps":
          k = "Steps";
          break;
        case "distance":
          k = "Distance";
          break;
        case "calories_burned":
          k = "Calories Burned";
          break;
        case "calories_taken":
          k = "Calories Taken";
          break;
        case "water_intake":
          k = "Water Intake";
          break;

        default:
          break;
      }
      return k;
    }

    const res = await fetch(`${API_URL}/admin/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
      body: JSON.stringify({
        name: e.name,
        durationDays: e.days,
        milestones: e.m,
        category: a(e.c),
        user: e.u,
        creator: "AI",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Failed to create goal");
      return;
    }

    toast.success("Goal created successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error creating goal:", err);
    toast.error("An error occurred while creating the goal.");
  }
};

// fake "AI" generator → returns one best-fit goal
function generateAISuggestion(userData) {
  if ((userData?.steps ?? 0) < 8000) {
    return pickRandom("steps");
  }
  if ((userData?.caloriesBurned ?? 0) < 400) {
    return pickRandom("calories_burned");
  }
  if ((userData?.caloriesTaken ?? 0) > 2200) {
    return pickRandom("calories_taken");
  }
  if ((userData?.water ?? 0) < 2000) {
    return pickRandom("water_intake");
  }
  // fallback
  return pickRandom("distance");
}

// helper to pick random goal by category
function pickRandom(category) {
  const filtered = goalPool.filter((g) => g.category === category);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function getCategoryIcon(category) {
  switch (category) {
    case "steps":
      return "👟";
    case "distance":
      return "📏";
    case "calories_burned":
      return "🔥";
    case "calories_taken":
      return "🍽️";
    case "water_intake":
      return "💧";
    default:
      return "🎯";
  }
}

export function AISuggestedGoals() {
  const [userGoals, setUserGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/goals/ai`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
          },
        });

        const result = await response.json();

        if (result.error) {
          toast.error(result.error);
        } else if (result.data && result.data.length > 0) {
          // Map each user → generate ONE AI goal
          const mapped = result.data.map((user) => ({
            user: user.user,
            stats: user,
            goal: generateAISuggestion(user),
          }));

          setUserGoals(mapped);

          console.log("AI Data:", mapped);
        }
      } catch (error) {
        console.error("Error fetching AI goals:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchGoals();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap gap-2 items-center">
          <CardTitle className="text-2xl">
            AI-Suggested Goals
            <p className="text-sm text-muted-foreground">
              Personalized based on each user’s activity & habits
            </p>
          </CardTitle>
          <Button className="bg-[#862633] text-white lg:ml-auto py-5.25">
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1563 3.91609C14.5464 4.30615 14.5464 4.93962 14.1563 5.32969L6.16772 13.3183C5.77766 13.7083 5.14419 13.7083 4.75412 13.3183L0.759835 9.32397C0.369768 8.93391 0.369768 8.30044 0.759835 7.91037C1.1499 7.5203 1.78337 7.5203 2.17344 7.91037L5.46248 11.1963L12.7458 3.91609C13.1359 3.52602 13.7693 3.52602 14.1594 3.91609H14.1563Z"
                fill="white"
              />
            </svg>
            Approve All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {userGoals.length > 0 ? (
          userGoals.map((u, idx) => (
            <div key={idx} className="space-y-6">
              {/* Single AI Goal */}
              <div className="border rounded-lg p-4">
                <div className="flex flex-wrap gap-2 justify-between items-start">
                  <div className="flex gap-3">
                    <span className="text-2xl">
                      <svg
                        width="41"
                        height="41"
                        viewBox="0 0 41 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.460449"
                          y="0.570312"
                          width="40"
                          height="40"
                          rx="6"
                          fill="#FFEDD5"
                        />
                        <path
                          d="M20.4507 12.0762C21.0033 12.0762 21.4497 12.5226 21.4497 13.0752V15.0732H25.1961C26.4386 15.0732 27.4439 16.0785 27.4439 17.3211V25.8128C27.4439 27.0553 26.4386 28.0606 25.1961 28.0606H15.7053C14.4628 28.0606 13.4575 27.0553 13.4575 25.8128V17.3211C13.4575 16.0785 14.4628 15.0732 15.7053 15.0732H19.4517V13.0752C19.4517 12.5226 19.8981 12.0762 20.4507 12.0762ZM16.9541 24.0645C16.6794 24.0645 16.4546 24.2893 16.4546 24.564C16.4546 24.8387 16.6794 25.0635 16.9541 25.0635H17.9531C18.2279 25.0635 18.4526 24.8387 18.4526 24.564C18.4526 24.2893 18.2279 24.0645 17.9531 24.0645H16.9541ZM19.9512 24.0645C19.6765 24.0645 19.4517 24.2893 19.4517 24.564C19.4517 24.8387 19.6765 25.0635 19.9512 25.0635H20.9502C21.2249 25.0635 21.4497 24.8387 21.4497 24.564C21.4497 24.2893 21.2249 24.0645 20.9502 24.0645H19.9512ZM22.9483 24.0645C22.6735 24.0645 22.4487 24.2893 22.4487 24.564C22.4487 24.8387 22.6735 25.0635 22.9483 25.0635H23.9473C24.222 25.0635 24.4468 24.8387 24.4468 24.564C24.4468 24.2893 24.222 24.0645 23.9473 24.0645H22.9483ZM18.7024 20.0684C18.7024 19.7372 18.5708 19.4195 18.3366 19.1853C18.1025 18.9512 17.7848 18.8196 17.4536 18.8196C17.1224 18.8196 16.8048 18.9512 16.5706 19.1853C16.3364 19.4195 16.2048 19.7372 16.2048 20.0684C16.2048 20.3996 16.3364 20.7172 16.5706 20.9514C16.8048 21.1856 17.1224 21.3172 17.4536 21.3172C17.7848 21.3172 18.1025 21.1856 18.3366 20.9514C18.5708 20.7172 18.7024 20.3996 18.7024 20.0684ZM23.4478 21.3172C23.779 21.3172 24.0966 21.1856 24.3308 20.9514C24.565 20.7172 24.6966 20.3996 24.6966 20.0684C24.6966 19.7372 24.565 19.4195 24.3308 19.1853C24.0966 18.9512 23.779 18.8196 23.4478 18.8196C23.1166 18.8196 22.7989 18.9512 22.5648 19.1853C22.3306 19.4195 22.199 19.7372 22.199 20.0684C22.199 20.3996 22.3306 20.7172 22.5648 20.9514C22.7989 21.1856 23.1166 21.3172 23.4478 21.3172ZM11.959 19.0693H12.4585V25.0635H11.959C11.1317 25.0635 10.4604 24.3923 10.4604 23.565V20.5679C10.4604 19.7406 11.1317 19.0693 11.959 19.0693ZM28.9424 19.0693C29.7697 19.0693 30.4409 19.7406 30.4409 20.5679V23.565C30.4409 24.3923 29.7697 25.0635 28.9424 25.0635H28.4429V19.0693H28.9424Z"
                          fill="#EA580C"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-medium text-lg">{u.goal?.goal}</h3>
                      <p className="text-sm text-muted-foreground">{u.user}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        handleSubmit({
                          name: u.goal?.goal,
                          days: u.goal?.duration,
                          m: u.goal?.milestone,
                          c: u.goal?.category,
                          u: u.user,
                        });
                      }}
                      variant="theme"
                      size="sm"
                    >
                      Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#FFF7ED] rounded-md">
                  <div className="flex gap-2">
                    <span className="text-lg">💡</span>
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        Why suggested:
                      </h4>
                      <p className="text-sm">{u.goal.reason}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No AI suggestions available.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
