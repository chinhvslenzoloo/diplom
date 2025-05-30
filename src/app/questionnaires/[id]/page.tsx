"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface Question {
  id: string;
  text: string;
  type: "TEXT" | "MULTIPLE_CHOICE" | "SINGLE_CHOICE";
  required: boolean;
  options: string[];
  order: number;
}

interface Questionnaire {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
  hasResponded: boolean;
  responseDate: string | null;
}

export default function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await fetch(
          `/api/questionnaires/${resolvedParams.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch questionnaire");
        const data = await response.json();
        setQuestionnaire(data);
        // Initialize answers with empty strings for all questions
        const initialAnswers: Record<string, string> = {};
        data.questions.forEach((q: Question) => {
          initialAnswers[q.id] = "";
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching questionnaire:", error);
        alert("Асуулгыг татахад алдаа гарлаа. Дараа дахин оролдоно уу.");
      }
    };

    fetchQuestionnaire();
  }, [resolvedParams.id]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionnaire) return;

    // Validate required questions
    const missingRequired = questionnaire.questions
      .filter((q) => q.required)
      .some((q) => !answers[q.id] || answers[q.id].trim() === "");

    if (missingRequired) {
      alert("Заавал хариулах асуултуудыг бөглөнө үү.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `/api/questionnaires/${resolvedParams.id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: Object.entries(answers)
              .filter(([_, value]) => value.trim() !== "")
              .map(([questionId, answer]) => ({
                questionId,
                answer,
              })),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit answers");

      alert("Таны хариулт амжилттай хүлээн авлаа");
      router.push("/jobseeker/applications");
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Хариултаа илгээхэд алдаа гарлаа. Дараа дахин оролдоно уу.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!questionnaire) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 font-medium">
            Ачааллаж байна...
          </p>
        </div>
      </div>
    );
  }

  if (questionnaire.hasResponded) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-32">
          <div className="bg-white shadow-sm p-8 sm:p-10">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {questionnaire.title}
              </h1>
              <button
                onClick={() => router.push("/jobseeker/applications")}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C213A]"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Өргөдлийн жагсаалт руу буцах
              </button>
            </div>
            {questionnaire.description && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700 text-sm">
                    {questionnaire.description}
                  </p>
                </div>
              </div>
            )}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-[#0C213A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">
                    Та энэ асуулгад хариулсан байна
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Хариулсан огноо:{" "}
                    {new Date(questionnaire.responseDate!).toLocaleDateString(
                      "mn-MN"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-32">
        <div className="bg-white shadow-sm p-8 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {questionnaire.title}
              </h1>
              <p className="text-gray-500 text-sm">
                Нийт {questionnaire.questions.length} асуулт
              </p>
            </div>
            <button
              onClick={() => router.push("/jobseeker/applications")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Өргөдлийн жагсаалт руу буцах
            </button>
          </div>

          {questionnaire.description && (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700 text-sm">
                  {questionnaire.description}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {questionnaire.questions
              .sort((a, b) => a.order - b.order)
              .map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white rounded-md border border-gray-200 p-6"
                >
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 font-medium text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <label className="block text-base font-medium text-gray-900 mb-4">
                        {question.text}
                        {question.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>

                      {question.type === "TEXT" && (
                        <textarea
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          required={question.required}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                          rows={4}
                          placeholder="Хариултаа энд бичнэ үү..."
                        />
                      )}

                      {question.type === "SINGLE_CHOICE" && (
                        <div className="space-y-2 mt-4">
                          {question.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={answers[question.id] === option}
                                onChange={(e) =>
                                  handleAnswerChange(
                                    question.id,
                                    e.target.value
                                  )
                                }
                                required={question.required}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-3 text-gray-700 text-sm">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {question.type === "MULTIPLE_CHOICE" && (
                        <div className="space-y-2 mt-4">
                          {question.options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value={option}
                                checked={answers[question.id]?.includes(option)}
                                onChange={(e) => {
                                  const currentAnswers = answers[question.id]
                                    ? answers[question.id]
                                        .split(",")
                                        .filter(Boolean)
                                    : [];
                                  const newAnswers = e.target.checked
                                    ? [...currentAnswers, option]
                                    : currentAnswers.filter(
                                        (a) => a !== option
                                      );
                                  handleAnswerChange(
                                    question.id,
                                    newAnswers.join(",")
                                  );
                                }}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="ml-3 text-gray-700 text-sm">
                                {option}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-8 mt-8">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2.5 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0C213A] hover:bg-[#0C213A]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C213A] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Илгээж байна...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Илгээх
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
