// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  MessageCircle,
  ClipboardCheck,
  BarChart,
  Users,
  FileText,
  Target,
  Trophy,
  Brain,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      {/* Top section: Heading left, Level & Schedule right */}
      <div className="mb-8 flex items-center justify-between">
        {/* Left: Main heading */}
        <div>
          <h1 className="text-4xl font-extrabold mb-2">
            AI Career Mentor Dashboard
          </h1>
          <p className="text-base text-gray-500">
            Your personalized journey to career success
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {/* Career Goals Achieved */}
            <div className="flex flex-col items-start bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-500">
                <Briefcase className="h-5 w-5" />
                <span className="text-sm font-medium">
                  Career Goals Achieved
                </span>
              </div>
              <span className="text-2xl font-bold mt-1">847</span>
              <span className="text-green-500 text-sm font-medium">+12%</span>
            </div>

            {/* Skills Learned */}
            <div className="flex flex-col items-start bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-purple-500">
                <Target className="h-5 w-5" />
                <span className="text-sm font-medium">Skills Learned</span>
              </div>
              <span className="text-2xl font-bold mt-1">2,341</span>
              <span className="text-green-500 text-sm font-medium">+8%</span>
            </div>

            {/* Interviews Passed */}
            <div className="flex flex-col items-start bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-500">
                <ClipboardCheck className="h-5 w-5" />
                <span className="text-sm font-medium">Interviews Passed</span>
              </div>
              <span className="text-2xl font-bold mt-1">156</span>
              <span className="text-green-500 text-sm font-medium">+23%</span>
            </div>

            {/* Job Offers */}
            <div className="flex flex-col items-start bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-pink-500">
                <Trophy className="h-5 w-5" />
                <span className="text-sm font-medium">Job Offers</span>
              </div>
              <span className="text-2xl font-bold mt-1">89</span>
              <span className="text-green-500 text-sm font-medium">+15%</span>
            </div>
          </div>
        </div>

        {/* Right: Level & Schedule Session */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            Level 7 Achiever
          </span>

          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Schedule Session
          </button>
        </div>
      </div>

      {/* Progress card: smaller */}
      <Card className="mb-8 p-4">
        <CardHeader>
          <CardTitle className="text-lg">Your Career Journey Progress</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm">
            You're making excellent progress! Keep up the momentum.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: "75%" }}
            />
          </div>
          <p className="text-right text-xs mt-1 font-medium">75%</p>
        </CardContent>
      </Card>

      {/* Dashboard cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Career Pathway */}
        <Link href="/dashboard/career-pathway">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                Career Pathway
              </CardTitle>
            </CardHeader>
            <CardContent>
              Plan and explore your personalized career roadmap.
            </CardContent>
          </Card>
        </Link>

        {/* Career Mentor */}
        <Link href="/dashboard/career-mentor">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                Career Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              Get AI-powered career guidance and interview tips.
            </CardContent>
          </Card>
        </Link>

        {/* Mock Interviews */}
        <Link href="/dashboard/mock-interview">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-yellow-500" />
                Mock Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              Practice interviews and receive detailed feedback.
            </CardContent>
          </Card>
        </Link>

        {/* Skill Gap Analysis */}
        <Link href="/dashboard/skill-analysis">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Skill Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              Identify your missing skills and recommended courses.
            </CardContent>
          </Card>
        </Link>

        {/* Resume & Cover Letter */}
        <Link href="/dashboard/resume-cover">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Resume & Cover Letter
              </CardTitle>
            </CardHeader>
            <CardContent>
              Generate ATS-optimized resumes and cover letters.
            </CardContent>
          </Card>
        </Link>

        {/* Progress Tracking */}
        <Link href="/dashboard/progress-tracking">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-pink-500" />
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              Track your career journey and achievements.
            </CardContent>
          </Card>
        </Link>

        {/* Networking & Mentoring */}
        <Link href="/dashboard/networking">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Networking & Mentoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              Connect with peers and mentors in your industry.
            </CardContent>
          </Card>
        </Link>

        {/* Salary & Trends */}
        <Link href="/dashboard/salary-trends">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-indigo-500" />
                Salary & Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              Explore salary insights and job market trends.
            </CardContent>
          </Card>
        </Link>

        {/* Personality Insights */}
        <Link href="/dashboard/personality-insights">
          <Card className="hover:shadow-lg transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-500" />
                Personality Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              Discover careers aligned with your personality.
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <div className="bg-blue-500 text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Ready to Accelerate Your Career?</h2>
          <p className="text-base mb-5 opacity-90">
            Join thousands of professionals who've transformed their careers with AI-powered guidance.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
}
