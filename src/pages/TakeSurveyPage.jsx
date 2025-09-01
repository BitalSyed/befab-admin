"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, getCookie } from "@/components/cookieUtils";
import { toast } from "react-toastify";

export default function TakeSurveyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({}); // { questionIndex: value or array }
  const [otherValues, setOtherValues] = useState({}); // for 'Other' text inputs
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/surveys/${id}`, {
          headers: { Authorization: `Bearer ${getCookie("skillrextech_auth")}` },
        });
        const data = await res.json();
        if (data.error) toast.error(data.error);
        else setSurvey(data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching survey");
      }
    };
    fetchSurvey();
  }, [id]);

  const handleChange = (qIdx, value, isOther = false, multi = false) => {
    if (multi) {
      const prev = answers[qIdx] || [];
      let newValue;
      if (prev.includes(value)) {
        newValue = prev.filter((v) => v !== value);
      } else {
        newValue = [...prev, value];
      }
      setAnswers((prev) => ({ ...prev, [qIdx]: newValue }));
      if (isOther) setOtherValues((prev) => ({ ...prev, [qIdx]: otherValues[qIdx] || "" }));
    } else {
      setAnswers((prev) => ({ ...prev, [qIdx]: value }));
      if (isOther) setOtherValues((prev) => ({ ...prev, [qIdx]: otherValues[qIdx] || "" }));
      else setOtherValues((prev) => ({ ...prev, [qIdx]: "" }));
    }
  };

  const handleOtherInput = (qIdx, value) => {
    setOtherValues((prev) => ({ ...prev, [qIdx]: value }));
  };

  const handleSubmit = async () => {
    if (!survey) return;

    // Validation: all questions required
    for (let idx = 0; idx < survey.questions.length; idx++) {
      const q = survey.questions[idx];
      let ans = answers[idx];

      // Replace 'Other' with typed value
      if ((q.kind === "single" || q.kind === "multi") && ans) {
        if (q.kind === "single" && ans === "Other") ans = otherValues[idx];
        if (q.kind === "multi" && ans.includes("Other")) {
          const idxOther = ans.indexOf("Other");
          if (otherValues[idx]) ans[idxOther] = otherValues[idx];
        }
      }

      if (!ans || (Array.isArray(ans) && ans.length === 0)) {
        toast.info(`Question ${idx + 1} is required`);
        return;
      }
    }

    // Prepare payload
    const formattedAnswers = survey.questions.map((q, idx) => {
      let ans = answers[idx];
      if ((q.kind === "single" || q.kind === "multi") && ans) {
        if (q.kind === "single" && ans === "Other") ans = otherValues[idx];
        if (q.kind === "multi" && Array.isArray(ans) && ans.includes("Other")) {
          const idxOther = ans.indexOf("Other");
          ans[idxOther] = otherValues[idx] || "Other";
        }
      }
      if (q.kind === "multi" && !Array.isArray(ans)) ans = [ans];
      return { question: q.q, answer: ans };
    });

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/surveys/${id}/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
        },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      const data = await res.json();
      if (data.error) toast.error(data.error);
      else {
        toast.success("Survey submitted successfully!");
        navigate("/surveys");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting survey");
    } finally {
      setLoading(false);
    }
  };

  if (!survey) return <div className="p-6 text-center">Loading survey...</div>;

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">{survey.title}</h1>
      {survey.description && <p className="text-gray-600">{survey.description}</p>}

      {survey.questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <label className="block font-semibold mb-2">{q.q}</label>

          {/* Text input */}
          {q.kind === "text" && (
            <Input
              value={answers[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder="Type your answer..."
            />
          )}

          {/* Number input */}
          {q.kind === "number" && (
            <Input
              type="number"
              value={answers[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
              placeholder="Enter a number..."
            />
          )}

          {/* Single / Multi Choice */}
          {(q.kind === "single" || q.kind === "multi") && (
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => (
                <div key={oIdx} className="flex items-center space-x-2">
                  <input
                    type={q.kind === "single" ? "radio" : "checkbox"}
                    name={`q-${idx}`}
                    value={opt}
                    checked={
                      q.kind === "single"
                        ? answers[idx] === opt
                        : (answers[idx] || []).includes(opt)
                    }
                    onChange={() =>
                      handleChange(idx, opt, opt === "Other", q.kind === "multi")
                    }
                  />
                  <span>{opt}</span>
                </div>
              ))}

              {/* Other input dynamically shown */}
              {((q.kind === "single" && answers[idx] === "Other") ||
                (q.kind === "multi" && (answers[idx] || []).includes("Other"))) && (
                <Input
                  placeholder="Please specify..."
                  value={otherValues[idx] || ""}
                  onChange={(e) => handleOtherInput(idx, e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
          )}
        </div>
      ))}

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Survey"}
      </Button>
    </div>
  );
}
