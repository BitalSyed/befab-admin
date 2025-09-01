"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "react-toastify";
import { API_URL, getCookie } from "@/components/cookieUtils";

export default function CreateGoalPage() {
  const [form, setForm] = useState({
    name: "",
    durationDays: "",
    milestones: "",
    category: "",
    user: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/admin/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create goal");
        return;
      }

      toast.success("Goal created successfully!");
      setForm({
        name: "",
        durationDays: "",
        milestones: "",
        category: "",
        user: "",
      });
    } catch (err) {
      console.error("Error creating goal:", err);
      toast.error("An error occurred while creating the goal.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Create a Goal</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Goal Name */}
            <div>
              <Label className="mb-2">What's your goal?</Label>
              <Input
                type="text"
                placeholder="Enter your goal"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* Duration (days) */}
            <div>
              <Label className="mb-2">By when (days)</Label>
              <Input
                type="number"
                placeholder="e.g., 30"
                value={form.durationDays}
                onChange={(e) => handleChange("durationDays", e.target.value)}
              />
            </div>

            {/* Milestones */}
            <div>
              <Label className="mb-2">Milestones</Label>
              <Textarea
                placeholder="List milestones here"
                value={form.milestones}
                onChange={(e) => handleChange("milestones", e.target.value)}
              />
            </div>

            {/* User */}
            <div>
              <Label className="mb-2">For user (username)</Label>
              <Input
                type="text"
                placeholder="username"
                value={form.user}
                onChange={(e) => handleChange("user", e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <Label className="mb-2">Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) => handleChange("category", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Steps">Steps</SelectItem>
                  <SelectItem value="Distance">Distance</SelectItem>
                  <SelectItem value="Calories Burned">Calories Burned</SelectItem>
                  <SelectItem value="Calories Taken">Calories Taken</SelectItem>
                  <SelectItem value="Water Intake">Water Intake</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full mt-5">
              Save Goal
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
