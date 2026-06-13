
import { getStudies } from "./studyService";

export const getStudiesDashboard = async () => {
  const studies = getStudies();
  const totalSubjects =
    studies.reduce(
      (sum, study) => sum + Number(study.enrolled || 0),
      0
    );

  return {
    kpis: {
      studies: studies.length,
      subjects: totalSubjects,
      queries: 18,
      visits: 36,
    },

    enrollmentTrend: [
      // Codex change: DashboardBarChart reads XAxis dataKey="name" and Bar dataKey="value".
      { name: "Jan", value: 12 },
      { name: "Feb", value: 18 },
      { name: "Mar", value: 25 },
      { name: "Apr", value: 32 },
      { name: "May", value: 41 },
      { name: "Jun", value: 55 },
    ],

    studyDistribution: [
      ...studies.map((study) => ({
        name: study.name,
        value: Number(study.enrolled || 0)
      })),
    ],

    recentSubjects: [
      {
        id: "SUB-001",
        study: "OCA Trial",
        status: "Active",
      },
      {
        id: "SUB-002",
        study: "SeptiTest",
        status: "Screening",
      },
    ],

    upcomingVisits: [
      {
        subject: "SUB-001",
        visit: "Visit 3",
        date: "2026-06-15",
      },
      {
        subject: "SUB-002",
        visit: "Screening Review",
        date: "2026-06-10",
      },
      {
        subject: "SUB-004",
        visit: "Baseline",
        date: "2026-06-24",
      },
    ],

    pendingQueries: [
      {
        id: "Q-101",
        subject: "SUB-001",
        status: "Open",
      },
    ],

    // Codex change: calendar schedules drive marked dates and date-specific visit details.
    calendarSchedules: [
      {
        date: "2026-06-10",
        time: "09:30 AM",
        subjectId: "SUB-002",
        subjectName: "Subject 02",
        visit: "Screening Review",
        study: "SeptiTest",
        site: "Apollo Hospital",
        status: "Scheduled",
      },
      {
        date: "2026-06-15",
        time: "11:00 AM",
        subjectId: "SUB-001",
        subjectName: "Subject 01",
        visit: "Visit 3",
        study: "OCA Trial",
        site: "Apollo Hospital",
        status: "Due",
      },
      {
        date: "2026-06-15",
        time: "02:30 PM",
        subjectId: "SUB-003",
        subjectName: "Subject 03",
        visit: "Lab Follow-up",
        study: "OCA Trial",
        site: "Apollo Hospital",
        status: "Scheduled",
      },
      {
        date: "2026-06-24",
        time: "10:15 AM",
        subjectId: "SUB-004",
        subjectName: "Subject 04",
        visit: "Baseline",
        study: "Headache Study",
        site: "Apollo Hospital",
        status: "Scheduled",
      },
    ],

    alerts: [
      {
        type: "warning",
        title: "Visit Window",
        message: "SUB-001 Visit 3 is due on 2026-06-15.",
      },
      {
        type: "info",
        title: "Schedule Update",
        message: "Screening Review is scheduled for SUB-002 on 2026-06-10.",
      },
    ],

    // Codex change: table data lives in the service so backend integration can replace this layer later.
    studies:
      studies.map((study) => ({
        studyId: study.code,
        protocol: study.protocol || study.name,
        site: study.site || study.location,
        subjects: study.enrolled,
        status: study.status
      })),
  };
};

export const getRecentActivities = () => {

  return [

    {
      id: 1,
      type: "Subject",
      title: "Subject SUB-001 enrolled",
      site: "Apollo Hospital",
      time: "09:10 AM",
    },

    {
      id: 2,
      type: "Visit",
      title: "Visit 3 completed",
      site: "Apollo Hospital",
      time: "08:45 AM",
    },

    {
      id: 3,
      type: "Document",
      title: "ICF_v2.pdf uploaded",
      site: "Apollo Hospital",
      time: "08:00 AM",
    },

  ];
};
