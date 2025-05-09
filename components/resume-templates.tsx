import type React from "react"

export type ResumeTemplateType = "classic" | "modern" | "creative" | "hacker"

interface ResumeTemplateProps {
  data: {
    personalInfo: {
      fullName: string
      email: string
      phone: string
      location: string
      linkedin: string
      website: string
    }
    summary: string
    experiences: Array<{
      id: string
      company: string
      position: string
      startDate: string
      endDate: string
      description: string
    }>
    education: Array<{
      id: string
      institution: string
      degree: string
      field: string
      startDate: string
      endDate: string
    }>
    skills: string
  }
}

export const ClassicTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="font-serif p-6 max-w-[800px] mx-auto bg-white text-gray-800 shadow-lg rounded-lg">
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{data.personalInfo.fullName}</h1>
        <div className="text-sm flex flex-wrap justify-center gap-x-4 text-gray-600">
          {data.personalInfo.email && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {data.personalInfo.location}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {data.personalInfo.linkedin}
            </span>
          )}
          {data.personalInfo.website && (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              {data.personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 text-gray-900">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 text-gray-900">Experience</h2>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600 font-medium">{`${exp.startDate} - ${exp.endDate}`}</span>
              </div>
              <p className="text-base italic mb-1 text-gray-700">{exp.company}</p>
              <p className="text-sm whitespace-pre-line text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 text-gray-900">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <span className="text-sm text-gray-600 font-medium">{`${edu.startDate} - ${edu.endDate}`}</span>
              </div>
              <p className="text-base text-gray-700">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills && (
        <div>
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(",").map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const ModernTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="font-sans p-6 max-w-[800px] mx-auto bg-white text-gray-800 shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-4 border-b-4 border-purple-600">
        <div>
          <h1 className="text-3xl font-bold text-purple-700 mb-2">{data.personalInfo.fullName}</h1>
          {data.summary && <p className="text-sm max-w-lg text-gray-600 leading-relaxed">{data.summary}</p>}
        </div>
        <div className="text-sm mt-3 md:mt-0 md:text-right space-y-1 text-gray-600">
          {data.personalInfo.email && (
            <p className="flex items-center md:justify-end">
              <svg
                className="w-4 h-4 mr-1 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {data.personalInfo.email}
            </p>
          )}
          {data.personalInfo.phone && (
            <p className="flex items-center md:justify-end">
              <svg
                className="w-4 h-4 mr-1 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {data.personalInfo.phone}
            </p>
          )}
          {data.personalInfo.location && (
            <p className="flex items-center md:justify-end">
              <svg
                className="w-4 h-4 mr-1 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {data.personalInfo.location}
            </p>
          )}
          {data.personalInfo.linkedin && (
            <p className="flex items-center md:justify-end">
              <svg
                className="w-4 h-4 mr-1 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {data.personalInfo.linkedin}
            </p>
          )}
          {data.personalInfo.website && (
            <p className="flex items-center md:justify-end">
              <svg
                className="w-4 h-4 mr-1 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              {data.personalInfo.website}
            </p>
          )}
        </div>
      </div>

      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center">
            <span className="bg-purple-700 w-6 h-1 mr-2"></span>
            Professional Experience
          </h2>
          {data.experiences.map((exp) => (
            <div
              key={exp.id}
              className="mb-5 pl-4 border-l-2 border-purple-200 hover:border-purple-500 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-bold text-base text-gray-900">{exp.position}</h3>
                <span className="text-sm text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-medium">
                  {`${exp.startDate} - ${exp.endDate}`}
                </span>
              </div>
              <p className="text-base font-medium mb-2 text-purple-600">{exp.company}</p>
              <p className="text-sm whitespace-pre-line text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center">
              <span className="bg-purple-700 w-6 h-1 mr-2"></span>
              Education
            </h2>
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="mb-4 pl-4 border-l-2 border-purple-200 hover:border-purple-500 transition-colors"
              >
                <h3 className="font-bold text-base text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-base text-purple-600">{edu.institution}</p>
                <p className="text-xs text-gray-600">{`${edu.startDate} - ${edu.endDate}`}</p>
              </div>
            ))}
          </div>
        )}

        {data.skills && (
          <div>
            <h2 className="text-lg font-bold text-purple-700 mb-4 flex items-center">
              <span className="bg-purple-700 w-6 h-1 mr-2"></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200 hover:bg-purple-100 transition-colors"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const CreativeTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="font-sans p-6 max-w-[800px] mx-auto bg-white text-gray-800 shadow-lg rounded-lg">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-3 text-sm mb-4">
          {data.personalInfo.email && (
            <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {data.personalInfo.location}
            </span>
          )}
        </div>
        {data.summary && <p className="text-sm leading-relaxed">{data.summary}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {data.experiences.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-700 w-8 h-1 mr-2"></span>
                Experience
              </h2>
              {data.experiences.map((exp) => (
                <div key={exp.id} className="mb-5 hover:translate-x-1 transition-transform">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="font-bold text-lg text-gray-900">{exp.position}</h3>
                    <span className="text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full">
                      {`${exp.startDate} - ${exp.endDate}`}
                    </span>
                  </div>
                  <p className="text-base font-medium text-purple-600 mb-2">{exp.company}</p>
                  <p className="text-sm whitespace-pre-line text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-700 w-8 h-1 mr-2"></span>
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4 hover:translate-x-1 transition-transform">
                  <h3 className="font-bold text-base text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-purple-600">{edu.field}</p>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  <p className="text-xs text-gray-600">{`${edu.startDate} - ${edu.endDate}`}</p>
                </div>
              ))}
            </div>
          )}

          {data.skills && (
            <div>
              <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                <span className="bg-purple-700 w-8 h-1 mr-2"></span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm hover:shadow-md transition-shadow"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
              <span className="bg-purple-700 w-8 h-1 mr-2"></span>
              Connect
            </h2>
            <div className="space-y-2">
              {data.personalInfo.linkedin && (
                <a
                  href={`https://${data.personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {data.personalInfo.linkedin}
                </a>
              )}
              {data.personalInfo.website && (
                <a
                  href={`https://${data.personalInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  {data.personalInfo.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const HackerTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="font-mono p-6 max-w-[800px] mx-auto bg-black text-green-400 shadow-lg rounded-lg border border-green-500">
      {/* Terminal Header */}
      <div className="mb-6 border-b border-green-500 pb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs text-gray-400">user@terminal:~/resume</span>
        </div>

        <h1 className="text-3xl font-bold mb-2 glitch-text">
          <span className="text-green-400">&gt; </span>
          {data.personalInfo.fullName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">[EMAIL]</span>
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">[PHONE]</span>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">[LOCATION]</span>
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">[LINKEDIN]</span>
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">[WEBSITE]</span>
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-cyan-400 border-b border-green-500/30 pb-1">
            <span className="text-yellow-400">$</span> cat summary.txt
          </h2>
          <p className="text-sm leading-relaxed whitespace-pre-line">{data.summary}</p>
        </div>
      )}

      {/* Experience Section */}
      {data.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-cyan-400 border-b border-green-500/30 pb-1">
            <span className="text-yellow-400">$</span> ls -la ./experience/
          </h2>
          {data.experiences.map((exp) => (
            <div
              key={exp.id}
              className="mb-4 border-l-2 border-green-500/50 pl-4 hover:border-cyan-400 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-bold text-base text-cyan-300">{exp.position}</h3>
                <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded font-mono">
                  {`${exp.startDate} - ${exp.endDate}`}
                </span>
              </div>
              <p className="text-sm text-yellow-400 mb-1">{exp.company}</p>
              <p className="text-xs whitespace-pre-line opacity-80">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-cyan-400 border-b border-green-500/30 pb-1">
            <span className="text-yellow-400">$</span> ls -la ./education/
          </h2>
          {data.education.map((edu) => (
            <div
              key={edu.id}
              className="mb-3 border-l-2 border-green-500/50 pl-4 hover:border-cyan-400 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <h3 className="font-bold text-base text-cyan-300">
                  {edu.degree} in {edu.field}
                </h3>
                <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded font-mono">
                  {`${edu.startDate} - ${edu.endDate}`}
                </span>
              </div>
              <p className="text-sm text-yellow-400">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {data.skills && (
        <div>
          <h2 className="text-lg font-bold mb-3 text-cyan-400 border-b border-green-500/30 pb-1">
            <span className="text-yellow-400">$</span> grep -r "skills" ./profile/
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-xs border border-green-500/30 hover:bg-green-800/40 transition-colors"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Footer */}
      <div className="mt-6 pt-4 border-t border-green-500/30 text-xs text-gray-400 flex justify-between">
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span className="animate-pulse">█</span>
      </div>
    </div>
  )
}

// Update the getResumeTemplate function to include the hacker template
export const getResumeTemplate = (template: ResumeTemplateType, data: ResumeTemplateProps["data"]) => {
  switch (template) {
    case "modern":
      return <ModernTemplate data={data} />
    case "creative":
      return <CreativeTemplate data={data} />
    case "hacker":
      return <HackerTemplate data={data} />
    case "classic":
    default:
      return <ClassicTemplate data={data} />
  }
}
