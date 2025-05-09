"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import DashboardHeader from "@/components/dashboard-header";
import SkillSuggestions from "@/components/skill-suggestions";
import LanguageSelector from "@/components/language-selector";
import { getTranslation, type Language } from "@/lib/translations";

export default function FormBuilderPage() {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    jobTitle: "",
    summary: "",
    experiences: [
      {
        id: "exp-1",
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        id: "edu-1",
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: "",
  });
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => getTranslation(language, key);

  const generateDefaultContent = () => {
    setFormData({
      personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/johndoe",
        website: "johndoe.com",
      },
      jobTitle: "Software Engineer",
      summary: "Experienced Software Engineer with a passion for building scalable web applications.",
      experiences: [
        {
          id: "exp-1",
          company: "Tech Company",
          position: "Software Engineer",
          startDate: "Jan 2020",
          endDate: "Present",
          description:
            "- Led development of key features for the company's main product\n- Implemented performance optimizations that improved load times by 40%\n- Mentored junior developers and conducted code reviews",
        },
        {
          id: "exp-2",
          company: "Startup Inc.",
          position: "Junior Developer",
          startDate: "Jun 2018",
          endDate: "Dec 2019",
          description:
            "- Developed responsive web interfaces using modern JavaScript frameworks\n- Collaborated with UX designers to implement user-friendly interfaces\n- Participated in agile development processes",
        },
      ],
      education: [
        {
          id: "edu-1",
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2014",
          endDate: "2018",
        },
      ],
      skills: "JavaScript, React, Node.js, TypeScript, HTML, CSS, Git, AWS, Python",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader onLogout={() => console.log("User logged out")} />

      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{t("Title")}</h1>
          </div>
          <LanguageSelector
            onLanguageChange={(lang: string) => setLanguage(lang as Language)}
            currentLanguage={language}
          />
        </div>

        <Button onClick={generateDefaultContent} className="mb-4">
          {t("generateContent")}
        </Button>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-8 w-full">
            <TabsTrigger value="personal-info">{t("personal Info")}</TabsTrigger>
            <TabsTrigger value="experience">{t("experience")}</TabsTrigger>
            <TabsTrigger value="education">{t("education")}</TabsTrigger>
            <TabsTrigger value="skills">{t("skills")}</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal-info">
            <Card>
              <CardHeader>
                <CardTitle>{t("Personal Info")}</CardTitle>
                <CardDescription>{t("Personal Info Description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Input
                    placeholder={t("fullName")}
                    value={formData.personalInfo.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, fullName: e.target.value },
                      })
                    }
                  />
                  <Input
                    placeholder={t("email")}
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                  />
                  <Input
                    placeholder={t("phone")}
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value },
                      })
                    }
                  />
                  <Input
                    placeholder={t("location")}
                    value={formData.personalInfo.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, location: e.target.value },
                      })
                    }
                  />
                  <Input
                    placeholder={t("linkedin")}
                    value={formData.personalInfo.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, linkedin: e.target.value },
                      })
                    }
                  />
                  <Input
                    placeholder={t("website")}
                    value={formData.personalInfo.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, website: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>{t("resume.experience")}</CardTitle>
                <CardDescription>{t("experienceDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                {formData.experiences.map((exp) => (
                  <div key={exp.id} className="grid gap-4 mb-4">
                    <Input
                      placeholder={t("company")}
                      value={exp.company}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experiences: formData.experiences.map((item) =>
                            item.id === exp.id ? { ...item, company: e.target.value } : item
                          ),
                        })
                      }
                    />
                    <Input
                      placeholder={t("position")}
                      value={exp.position}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experiences: formData.experiences.map((item) =>
                            item.id === exp.id ? { ...item, position: e.target.value } : item
                          ),
                        })
                      }
                    />
                    <Textarea
                      placeholder={t("description")}
                      value={exp.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experiences: formData.experiences.map((item) =>
                            item.id === exp.id ? { ...item, description: e.target.value } : item
                          ),
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>{t("education")}</CardTitle>
                <CardDescription>{t("educationDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                {formData.education.map((edu) => (
                  <div key={edu.id} className="grid gap-4 mb-4">
                    <Input
                      placeholder={t("institution")}
                      value={edu.institution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education: formData.education.map((item) =>
                            item.id === edu.id ? { ...item, institution: e.target.value } : item
                          ),
                        })
                      }
                    />
                    <Input
                      placeholder={t("degree")}
                      value={edu.degree}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education: formData.education.map((item) =>
                            item.id === edu.id ? { ...item, degree: e.target.value } : item
                          ),
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>{t("skills")}</CardTitle>
                <CardDescription>{t("skillsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t("skillsPlaceholder")}
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
