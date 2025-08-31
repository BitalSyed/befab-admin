import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollText, Sparkles, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, getCookie } from "./cookieUtils";

const suggestions = [
  {
    icon: <ScrollText className="h-5 w-5 text-purple-500" />,
    title: "Autumn Running Series",
    desc: "A 6-week progressive running challenge with weekly distance goals and achievement badges.",
    timeframe: "Sep 15 - Oct 31, 2023",
    reasons: [
      "Running activity up 23% in the last month",
      "Seasonal transition ideal for outdoor activity",
    ],
  },
  {
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    title: "Nutrition Reset Challenge",
    desc: "A 21-day healthy eating challenge focused on meal planning and macro tracking.",
    timeframe: "Aug 1 - Aug 21, 2023",
    reasons: [
      "High user forum activity about nutrition",
      "Previous nutrition challenges had 78% completion rate",
    ],
  },
  {
    icon: <Brain className="h-5 w-5 text-purple-500" />,
    title: "Mindfulness & Recovery",
    desc: "A 30-day challenge focusing on meditation, stretching, and recovery techniques.",
    timeframe: "Aug 15 - Sep 15, 2023",
    reasons: [
      "Increased searches for recovery content",
      "Complements current high-intensity challenges",
    ],
  },
];

const AiSuggestions = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState(""); // 🔹 New state
  const [suggestions, setSuggestion] = useState([]); // 🔹 New state

  const categories = [
    "Fitness",
    "Nutrition",
    "Wellness",
    "Strength",
    "Cardio",
    "Team",
  ];

  const publishCompetition = (title, description, start, end, category) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Validation
    if (!title || !description || !start || !end || !category) {
      toast.error("All fields are required.");
      return;
    }

    if (startDate < today) {
      toast.error("Start date cannot be before today.");
      return;
    }

    if (endDate < startDate) {
      toast.error("End date cannot be before start date.");
      return;
    }

    // Send JSON
    fetch(`${API_URL}/admin/competitions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("skillrextech_auth")}`,
      },
      body: JSON.stringify({ title, description, start, end, category, type: 'AI' }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) toast.error(data.error);
        else {
          toast.success(data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error adding competition.");
      });
  };

  // Simple Levenshtein distance for fuzzy matching
  function levenshtein(a, b) {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }
    return matrix[a.length][b.length];
  }

  // Random helper
  function pickRandom(arr, count = 1) {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return count === 1 ? shuffled[0] : shuffled.slice(0, count);
  }

  // Large-ish datasets (can be extended with hundreds more entries)
  const DATASETS = {
    Fitness: {
      titles: [
        "Strength Surge: Full Body Power",
        "Mindfulness & Recovery: Evening Reset",
        "30-Day Pushup Power: Week 1",
        "Cardio Burnout: Sprint Endurance",
        "Daily HIIT Mastery: Core Inferno",
        "Mobility Matters: Hips & Shoulders",
        "Flex & Flow: Dynamic Stretch Series",
        "Core Crusher: Stability & Strength",
        "Beast Mode Bootcamp: Outdoor Grind",
        "Strength Surge: Dumbbell Edition",
        "Mindfulness & Recovery: Morning Flow",
        "30-Day Pushup Power: Advanced Variations",
        "Cardio Burnout: Hill Intervals",
        "Daily HIIT Mastery: Tabata Challenge",
        "Mobility Matters: Spine & Back Care",
        "Flex & Flow: Yoga for Athletes",
        "Core Crusher: Balance Ball Workout",
        "Beast Mode Bootcamp: Partner Edition",
        "Strength Surge: Resistance Bands",
        "Mindfulness & Recovery: Guided Breathwork",
      ],
      desc: [
        "Explosive strength training targeting the whole body with progressive overload.",
        "Wind down with stretching, light yoga, and breathwork to aid recovery.",
        "Progressive pushup variations designed to build chest, shoulders, and core.",
        "Short bursts of sprints to increase lung capacity and burn fat fast.",
        "High-intensity interval training that torches calories while building endurance.",
        "Unlock hip and shoulder flexibility to prevent injuries and improve range of motion.",
        "Dynamic stretches that blend yoga and mobility drills for fluid movement.",
        "Core-focused training to improve balance, stability, and posture.",
        "Bootcamp-style training that combines cardio and strength outdoors.",
        "Dumbbell-only workout targeting major muscle groups with compound lifts.",
        "Morning routine blending mobility and breathwork for mental clarity.",
        "Pushup challenge with explosive and weighted progressions for strength.",
        "Interval hill running to build power, speed, and endurance.",
        "Tabata-inspired HIIT circuit for maximum calorie burn in minimal time.",
        "Spinal mobility drills and back-care stretches to reduce stiffness.",
        "Yoga-based flexibility series tailored for athletes and lifters.",
        "Balance ball workout for dynamic core stability and coordination.",
        "Partner-based bootcamp workouts for fun and accountability.",
        "Full-body strength circuit using only resistance bands.",
        "Guided breathwork to lower stress and improve recovery efficiency.",
      ],
      reasons: [
        "Rising demand for hybrid strength programs.",
        "Recovery-based routines trending among office workers.",
        "Pushup challenges popular in online communities.",
        "Cardio-based HIIT searches increasing worldwide.",
        "Short, high-burn workouts fit busy lifestyles.",
        "Mobility drills gaining attention for injury prevention.",
        "Yoga-meets-fitness formats showing high retention.",
        "Core-focused training aligns with posture awareness trends.",
        "Outdoor group workouts attracting younger demographics.",
        "Home dumbbell programs in high demand post-pandemic.",
        "Morning wellness rituals trending on TikTok & Instagram.",
        "Strength progression challenges resonate with athletes.",
        "Hill running programs linked to marathon preparation.",
        "Tabata still among top searches for fat loss.",
        "Spinal mobility a growing concern among desk workers.",
        "Yoga integration appeals to athletes seeking balance.",
        "Stability ball content trending in fitness apps.",
        "Partner workouts boost social accountability.",
        "Resistance band programs booming on YouTube.",
        "Breathwork gaining traction in mindfulness communities.",
      ],
    },
    Nutrition: {
      titles: [
        "Eat Clean 30: Whole Food Reset",
        "Fuel Your Body: Athlete’s Meal Plan",
        "Protein Power: Muscle Builder",
        "Green Gains: Superfood Smoothies",
        "Detox Delight: 7-Day Cleanse",
        "Plant-Based Challenge: Beginner Edition",
        "Eat Clean 30: Family-Friendly Meals",
        "Fuel Your Body: Pre-Workout Boost",
        "Protein Power: High-Protein Snacks",
        "Green Gains: Immunity Boost",
        "Detox Delight: Juice Reset",
        "Plant-Based Challenge: Advanced",
        "Eat Clean 30: Budget Edition",
        "Fuel Your Body: Post-Workout Recovery",
        "Protein Power: Breakfast Builder",
        "Green Gains: Salad Revolution",
        "Detox Delight: Herbal Infusion Plan",
        "Plant-Based Challenge: Vegan Athletes",
        "Eat Clean 30: Seasonal Eating",
        "Fuel Your Body: Travel-Friendly Nutrition",
      ],
      desc: [
        "A 30-day challenge focusing on whole, unprocessed foods.",
        "Meal plans tailored for athletic performance and recovery.",
        "High-protein recipes to support lean muscle growth.",
        "Daily green smoothies packed with micronutrients.",
        "A gentle detox designed to reset digestion and energy.",
        "Step-by-step transition into a plant-based diet.",
        "Family-friendly meals that make clean eating accessible.",
        "Nutrient-dense snacks and meals to fuel workouts.",
        "Quick high-protein snack recipes for busy lifestyles.",
        "Immune-boosting recipes rich in vitamins and antioxidants.",
        "Juicing plan to cleanse and energize the body.",
        "Advanced plant-based meal prep for seasoned vegans.",
        "Affordable clean eating recipes on a tight budget.",
        "Nutrient timing strategies for post-workout recovery.",
        "High-protein breakfast options for lasting energy.",
        "Creative salads featuring superfoods and unique dressings.",
        "Detox teas and herbal infusions for gut health.",
        "Vegan-friendly plans tailored for active individuals.",
        "Recipes built around seasonal, fresh produce.",
        "Healthy eating strategies for travelers and busy professionals.",
      ],
      reasons: [
        "Increased demand for structured meal challenges.",
        "Athletes searching for performance-based diets.",
        "High interest in protein-rich nutrition content.",
        "Superfood trends popular on Instagram and TikTok.",
        "Detox and cleansing programs remain evergreen.",
        "Growing shift toward plant-based eating worldwide.",
        "Families looking for healthier cooking guides.",
        "Pre-workout nutrition searches are rising.",
        "Snacking solutions in high demand post-pandemic.",
        "Immune health a major driver of wellness trends.",
        "Juicing remains a strong niche in nutrition apps.",
        "Advanced vegan meal plans trending globally.",
        "Budget-friendly nutrition popular among students.",
        "Recovery-focused diets growing with fitness communities.",
        "Protein breakfast content trending on YouTube.",
        "Creative salad recipes dominate food blogs.",
        "Herbal detox plans gaining new audiences.",
        "Vegan athletes seeking specialized resources.",
        "Seasonal eating linked to sustainability awareness.",
        "Portable nutrition programs for busy lifestyles.",
      ],
    },
    Wellness: {
      titles: [
        "Stress Less: Daily Relaxation Habits",
        "Sleep Soundly: Nighttime Rituals",
        "Mindful Moments: Guided Meditation",
        "Daily Gratitude: Morning Practice",
        "Self-Care Sundays: Reset & Recharge",
        "Digital Detox: Screen-Free Challenge",
        "Stress Less: Breathing Techniques",
        "Sleep Soundly: Yoga for Sleep",
        "Mindful Moments: Journaling Prompts",
        "Daily Gratitude: Evening Reflections",
        "Self-Care Sundays: Spa at Home",
        "Digital Detox: Social Media Cleanse",
        "Stress Less: Progressive Muscle Relaxation",
        "Sleep Soundly: Bedtime Stories",
        "Mindful Moments: Walking Meditation",
        "Daily Gratitude: Relationship Focus",
        "Self-Care Sundays: Nature Retreat",
        "Digital Detox: Work-Life Boundaries",
        "Stress Less: Aromatherapy Rituals",
        "Sleep Soundly: White Noise Therapy",
      ],
      desc: [
        "Techniques to manage stress and enhance calm daily.",
        "Bedtime routines to improve sleep quality and recovery.",
        "Meditation sessions designed for clarity and balance.",
        "Daily gratitude practice to reframe mindset positively.",
        "Dedicated self-care routines for rejuvenation.",
        "Challenge to disconnect from screens and recharge.",
        "Breathing patterns proven to lower stress levels.",
        "Gentle yoga poses to ease the body into sleep.",
        "Guided journaling to build self-awareness.",
        "Nightly gratitude reflection for better mental health.",
        "DIY home spa rituals for physical and emotional relief.",
        "Step-by-step social media detox guide.",
        "Relaxation method releasing tension through muscles.",
        "Audio bedtime stories to aid in sleep relaxation.",
        "Walking meditations to combine movement and mindfulness.",
        "Gratitude practices focused on relationships.",
        "Weekend nature immersion to restore balance.",
        "Boundaries for healthy digital consumption.",
        "Aromatherapy blends for stress relief.",
        "Use of white noise to enhance sleep cycles.",
      ],
      reasons: [
        "Mental health awareness continues to grow.",
        "Poor sleep quality common among professionals.",
        "Mindfulness trending across apps and podcasts.",
        "Gratitude journaling proven to reduce stress.",
        "Self-care routines popular among young adults.",
        "Screen fatigue driving digital detox practices.",
        "Breathwork rapidly gaining popularity.",
        "Yoga for sleep recommended in wellness circles.",
        "Journaling booming on TikTok and Instagram.",
        "Daily gratitude challenges trending globally.",
        "DIY spa content among top wellness searches.",
        "Social media detox challenges highly shareable.",
        "Muscle relaxation popular in therapy practices.",
        "Story-based relaxation apps growing fast.",
        "Walking meditation adopted in workplaces.",
        "Relationship-focused wellness programs emerging.",
        "Nature retreats trending as urban escapes.",
        "Digital boundaries a hot workplace topic.",
        "Aromatherapy kits selling widely online.",
        "White noise therapy apps highly downloaded.",
      ],
    },
    Strength: {
      titles: [
        "Powerlifting Basics: Squat Mastery",
        "Muscle Max: Hypertrophy Phase",
        "Bodyweight Strength: Calisthenics Core",
        "Kettlebell King: Swing & Snatch",
        "Barbell Blitz: Deadlift Dominance",
        "Strength Foundations: Beginner’s Guide",
        "Powerlifting Basics: Bench Press Focus",
        "Muscle Max: Push-Pull Split",
        "Bodyweight Strength: Handstand Progression",
        "Kettlebell King: Flow Circuits",
        "Barbell Blitz: Olympic Lifts Intro",
        "Strength Foundations: Core Stability",
        "Powerlifting Basics: Competition Prep",
        "Muscle Max: High Volume Phase",
        "Bodyweight Strength: One-Arm Pushups",
        "Kettlebell King: Complex Conditioning",
        "Barbell Blitz: Power Clean Training",
        "Strength Foundations: Injury Prevention",
        "Powerlifting Basics: Accessory Work",
        "Muscle Max: Strength Plateau Breaker",
      ],
      desc: [
        "Fundamental squat techniques to build leg strength.",
        "Hypertrophy routines designed for maximum muscle growth.",
        "Core-focused calisthenics routines for bodyweight mastery.",
        "Kettlebell swings and snatches for explosive strength.",
        "Deadlift variations to increase raw pulling power.",
        "Entry-level strength guide covering key movement patterns.",
        "Bench press technique breakdown for safe progress.",
        "Push-pull split routine for balanced development.",
        "Progression drills to master handstands with strength.",
        "Kettlebell flows combining multiple lifts into circuits.",
        "Beginner-friendly intro to Olympic weightlifting.",
        "Core stability training to support heavy lifting.",
        "Strength prep for powerlifting competition cycles.",
        "High-volume training for hypertrophy gains.",
        "Advanced calisthenics with one-arm pushup progressions.",
        "Conditioning complexes with kettlebells for endurance.",
        "Focused training on the power clean lift.",
        "Strength training with emphasis on joint health.",
        "Accessory lifts to support the big three.",
        "Strategies to break through muscle growth plateaus.",
      ],
      reasons: [
        "Squat programs remain top-searched strength content.",
        "Hypertrophy phases align with bodybuilding trends.",
        "Calisthenics growing as a minimal-equipment option.",
        "Kettlebell workouts trending globally on YouTube.",
        "Deadlift programs popular in powerlifting forums.",
        "Beginner-friendly strength content in high demand.",
        "Bench press challenges trending among gym-goers.",
        "Push-pull split routines widely adopted.",
        "Handstand skills a big calisthenics milestone.",
        "Kettlebell flow circuits trending on Instagram.",
        "Olympic lifting resurging in CrossFit communities.",
        "Core stability a consistent fitness priority.",
        "Powerlifting competitions fueling program interest.",
        "Volume training central in hypertrophy research.",
        "Advanced calisthenics rising in popularity.",
        "Kettlebell endurance catching global attention.",
        "Olympic lifts gaining Olympic-year traction.",
        "Injury prevention programs highly requested.",
        "Accessory lifts popular for strength athletes.",
        "Plateau-breaking content valued in strength apps.",
      ],
    },
    Cardio: {
      titles: [
        "Run Strong: 5K Beginner Plan",
        "Cycling Challenge: Endurance Miles",
        "Jump Rope Jam: Double Unders",
        "Endurance Builder: Long Distance Runs",
        "Sprint Series: Speed Training",
        "Cardio Kickstart: Beginner’s Guide",
        "Run Strong: Marathon Prep",
        "Cycling Challenge: Hill Climbs",
        "Jump Rope Jam: Speed & Agility",
        "Endurance Builder: Rowing Sessions",
        "Sprint Series: Track Workouts",
        "Cardio Kickstart: Walking to Jogging",
        "Run Strong: Trail Running Basics",
        "Cycling Challenge: Interval Training",
        "Jump Rope Jam: Weighted Ropes",
        "Endurance Builder: Triathlon Base",
        "Sprint Series: Football Sprints",
        "Cardio Kickstart: Dance Cardio",
        "Run Strong: Treadmill Progressions",
        "Cycling Challenge: Indoor Spin Sessions",
      ],
      desc: [
        "Intro plan to build stamina for a 5K run.",
        "Cycling routines for improved aerobic endurance.",
        "Jump rope drills with a focus on double unders.",
        "Long-distance run training to enhance endurance.",
        "Sprint-based workouts to increase top speed.",
        "Step-by-step guide for cardio beginners.",
        "Structured plan to prepare for a marathon.",
        "Hill climb cycling sessions for power and strength.",
        "Agility jump rope routines for athletes.",
        "Rowing cardio sessions for full-body conditioning.",
        "Track intervals to build running speed.",
        "Walking-to-jogging plan for new runners.",
        "Trail running introduction for outdoor fitness.",
        "Interval-based cycling workouts for fat loss.",
        "Weighted rope sessions for advanced jumpers.",
        "Triathlon base training across swim, bike, run.",
        "Sprints used in football conditioning workouts.",
        "Dance-based cardio program for fun fitness.",
        "Progressive treadmill workouts for variety.",
        "Indoor spin workouts with music-based intervals.",
      ],
      reasons: [
        "5K running plans top search results yearly.",
        "Cycling challenges remain popular among enthusiasts.",
        "Jump rope tutorials trending on TikTok.",
        "Endurance running tied to marathon growth.",
        "Speed training programs widely requested.",
        "Beginner cardio guides are evergreen.",
        "Marathon prep programs have global appeal.",
        "Hill cycling rising in popularity on Strava.",
        "Agility training demanded in sports fitness.",
        "Rowing machines trending in gyms worldwide.",
        "Track sprint training resurging in athletics.",
        "Beginner-friendly walk-to-jog programs requested.",
        "Trail running niche growing steadily.",
        "Cycling interval sessions shared widely online.",
        "Weighted jump ropes becoming fitness staples.",
        "Triathlon programs have dedicated audiences.",
        "Football-style sprint drills gaining traction.",
        "Dance cardio trending in group classes.",
        "Treadmill workouts consistently searched.",
        "Spin sessions booming in boutique studios.",
      ],
    },
    Team: {
      titles: [
        "Group Fitness Fun: Circuit Relay",
        "Partner Workouts: Bodyweight Pairing",
        "Team Triathlon: Mixed Relay",
        "Relay Races: Track Challenge",
        "Bootcamp Buddies: Outdoor Training",
        "Squad Goals: HIIT Together",
        "Group Fitness Fun: Battle Ropes",
        "Partner Workouts: Medicine Ball Throws",
        "Team Triathlon: Swim-Bike-Run Relay",
        "Relay Races: Obstacle Course Edition",
        "Bootcamp Buddies: Sandbag Training",
        "Squad Goals: Tabata Teams",
        "Group Fitness Fun: Resistance Bands",
        "Partner Workouts: Synchronized Lifts",
        "Team Triathlon: Indoor Competition",
        "Relay Races: Stadium Stairs",
        "Bootcamp Buddies: Tire Flips",
        "Squad Goals: Circuit Endurance",
        "Group Fitness Fun: Dance Fusion",
        "Partner Workouts: TRX Challenge",
      ],
      desc: [
        "Group circuit workouts designed as relay races.",
        "Partner-based bodyweight exercises for teamwork.",
        "Triathlon mixed relay format for group fitness.",
        "Classic relay races with team strategies.",
        "Outdoor bootcamp sessions with friends.",
        "High-intensity team circuits for accountability.",
        "Battle rope circuits done in pairs or teams.",
        "Medicine ball partner drills for power and fun.",
        "Swim-bike-run relay setup for team challenge.",
        "Obstacle relay races for competition and fun.",
        "Sandbag-focused group strength sessions.",
        "Team-based Tabata circuits for conditioning.",
        "Resistance band partner circuits.",
        "Synchronized lifting routines for two.",
        "Indoor triathlon-style group event.",
        "Stadium stair runs as a relay team workout.",
        "Bootcamp tire flips for group challenges.",
        "Endurance circuits designed for squads.",
        "Dance fusion cardio classes in a group setting.",
        "TRX suspension training for two partners.",
      ],
      reasons: [
        "Relay races trending in corporate wellness.",
        "Partner workouts boost accountability.",
        "Triathlon interest expanding into group formats.",
        "Track relays tied to school & community events.",
        "Bootcamps remain popular for outdoor fitness.",
        "HIIT with friends trending on social media.",
        "Battle rope training popular in gyms.",
        "Medicine ball drills shared on fitness apps.",
        "Triathlon relays popular among hobby athletes.",
        "Obstacle races growing in demand globally.",
        "Sandbag training fits functional fitness trend.",
        "Tabata group classes gaining traction.",
        "Resistance band partner work on the rise.",
        "Synchronized lifts challenge advanced lifters.",
        "Indoor triathlon new trend in group fitness.",
        "Stadium stair runs going viral online.",
        "Tire flips a staple of bootcamp-style training.",
        "Endurance circuits loved by team athletes.",
        "Dance cardio groups driving engagement.",
        "TRX partner workouts trending on Instagram.",
      ],
    },
  };

  // Timeframe generator
  function generateTimeframe() {
  const start = new Date();
  start.setDate(start.getDate() + 1); // start from tomorrow

  const end = new Date(start); 
  end.setDate(start.getDate() + 30); // 30 days after start

  return (
    start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " - " +
    end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  );
}

  // AI-like suggestion generator
  function generateCompetition(categoryInput) {
    // Find best match category with fuzzy matching
    const categories = Object.keys(DATASETS);
    let bestCategory = categories[0];
    let bestScore = Infinity;

    for (let cat of categories) {
      let dist = levenshtein(categoryInput.toLowerCase(), cat.toLowerCase());
      if (dist < bestScore) {
        bestScore = dist;
        bestCategory = cat;
      }
    }

    const dataset = DATASETS[bestCategory];

    return {
      title: pickRandom(dataset.titles),
      desc: pickRandom(dataset.desc),
      timeframe: generateTimeframe(),
      reasons: pickRandom(dataset.reasons, 2),
      category: bestCategory,
    };
  }

  useEffect(() => {
    setSuggestion(
      [1, 2, 3].map(() =>
        generateCompetition(pickRandom(Object.keys(DATASETS)))
      )
    );
  }, []);

  return (
    <div className="p-6 bg-white rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-semibold">
            AI-Generated Competition Suggestions
          </h1>
          <p className="text-sm text-gray-500">
            Based on user activity and engagement patterns
          </p>
        </div>
        {/* <a href="#" className="text-sm font-medium text-[#862633]">
          View All Suggestions
        </a> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((s, i) => (
          <Card key={i} className="border rounded-lg shadow-sm bg-[#F9FAFB]">
            <CardContent className="p-4 py-0 space-y-2">
              <div className="flex items-center gap-2">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.460007"
                    y="0.720703"
                    width="31.99"
                    height="31.99"
                    rx="15.995"
                    fill="#F3E8FF"
                  />
                  <path
                    d="M16.4503 8.22656C17.0028 8.22656 17.4493 8.673 17.4493 9.22559V11.2236H21.1956C22.4382 11.2236 23.4434 12.2289 23.4434 13.4714V21.9632C23.4434 23.2057 22.4382 24.211 21.1956 24.211H11.7049C10.4624 24.211 9.45708 23.2057 9.45708 21.9632V13.4714C9.45708 12.2289 10.4624 11.2236 11.7049 11.2236H15.4512V9.22559C15.4512 8.673 15.8977 8.22656 16.4503 8.22656ZM12.9537 20.2149C12.6789 20.2149 12.4542 20.4396 12.4542 20.7144C12.4542 20.9891 12.6789 21.2139 12.9537 21.2139H13.9527C14.2274 21.2139 14.4522 20.9891 14.4522 20.7144C14.4522 20.4396 14.2274 20.2149 13.9527 20.2149H12.9537ZM15.9507 20.2149C15.676 20.2149 15.4512 20.4396 15.4512 20.7144C15.4512 20.9891 15.676 21.2139 15.9507 21.2139H16.9498C17.2245 21.2139 17.4493 20.9891 17.4493 20.7144C17.4493 20.4396 17.2245 20.2149 16.9498 20.2149H15.9507ZM18.9478 20.2149C18.6731 20.2149 18.4483 20.4396 18.4483 20.7144C18.4483 20.9891 18.6731 21.2139 18.9478 21.2139H19.9468C20.2216 21.2139 20.4464 20.9891 20.4464 20.7144C20.4464 20.4396 20.2216 20.2149 19.9468 20.2149H18.9478ZM14.702 16.2188C14.702 15.8876 14.5704 15.5699 14.3362 15.3357C14.102 15.1015 13.7844 14.97 13.4532 14.97C13.122 14.97 12.8044 15.1015 12.5702 15.3357C12.336 15.5699 12.2044 15.8876 12.2044 16.2188C12.2044 16.55 12.336 16.8676 12.5702 17.1018C12.8044 17.336 13.122 17.4675 13.4532 17.4675C13.7844 17.4675 14.102 17.336 14.3362 17.1018C14.5704 16.8676 14.702 16.55 14.702 16.2188ZM19.4473 17.4675C19.7785 17.4675 20.0962 17.336 20.3304 17.1018C20.5645 16.8676 20.6961 16.55 20.6961 16.2188C20.6961 15.8876 20.5645 15.5699 20.3304 15.3357C20.0962 15.1015 19.7785 14.97 19.4473 14.97C19.1161 14.97 18.7985 15.1015 18.5643 15.3357C18.3301 15.5699 18.1986 15.8876 18.1986 16.2188C18.1986 16.55 18.3301 16.8676 18.5643 17.1018C18.7985 17.336 19.1161 17.4675 19.4473 17.4675ZM7.95854 15.2197H8.45806V21.2139H7.95854C7.13123 21.2139 6.46001 20.5427 6.46001 19.7154V16.7183C6.46001 15.891 7.13123 15.2197 7.95854 15.2197ZM24.942 15.2197C25.7693 15.2197 26.4405 15.891 26.4405 16.7183V19.7154C26.4405 20.5427 25.7693 21.2139 24.942 21.2139H24.4425V15.2197H24.942Z"
                    fill="#A855F7"
                  />
                </svg>

                <span className="text-sm font-medium text-[#6B21A8]">
                  AI Suggestion
                </span>
                {/* <span className="text-xs text-gray-400 ml-auto">
                  Generated{" "}
                  {i === 0 ? "2 hours" : i === 1 ? "5 hours" : "1 day"} ago
                </span> */}
              </div>
              <h2 className="text-md font-semibold mt-5">{s.title}</h2>
              <p className="text-sm text-gray-600 leading-snug">{s.desc}</p>
              <div className="text-md text-gray-800 font-bold">
                <span className="font-medium mb-5 text-sm">
                  Suggested timeframe:
                </span>{" "}
                <br />
                {s.timeframe}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Why this was suggested:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
                  {s.reasons.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between pt-2">
                {/* <Button variant="outline" className="text-sm w-[40%]">
                  Modify
                </Button> */}
                <Button onClick={()=> confirm("Are you sure...?")? publishCompetition(s.title, s.desc, new Date(s.timeframe.split(" - ")[0]).toISOString().split("T")[0], new Date(s.timeframe.split(" - ")[1]).toISOString().split("T")[0], s.category): ''} className="text-sm w-[40%] bg-[#862633] text-white">
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AiSuggestions;
