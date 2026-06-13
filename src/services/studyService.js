const STUDIES_STORAGE_KEY = "trianxtStudies";
const AUDIT_LOG_KEY = "auditLogs";

export const defaultStudies = [
  {
    code: "747-303",
    name: "OBETICHOLIC ACID (OCA)",
    protocol: "OBETICHOLIC ACID (OCA)",
    location: "Apollo Hospital",
    site: "Apollo Hospital",
    enrolled: 1,
    targetSubjects: 50,
    status: "Active",
    principalInvestigator: "Dr. Meera Rao",
    sponsor: "TriaNXT Research",
    startDate: "2026-06-01",
    description: "OCA clinical trial study"
  },
  {
    code: "05151",
    name: "SeptiTest",
    protocol: "SeptiTest",
    location: "Apollo Hospital",
    site: "Apollo Hospital",
    enrolled: 8,
    targetSubjects: 80,
    status: "Screening",
    principalInvestigator: "Dr. Arun Kumar",
    sponsor: "TriaNXT Research",
    startDate: "2026-06-03",
    description: "Sepsis diagnostic study"
  }
];

function getStoredStudies() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(
      localStorage.getItem(
        STUDIES_STORAGE_KEY
      )
    ) || [];
  } catch {
    return [];
  }
}

function saveStoredStudies(studies) {
  localStorage.setItem(
    STUDIES_STORAGE_KEY,
    JSON.stringify(studies)
  );
}

function normalizeStudy(study) {
  return {
    ...study,
    protocol:
      study.protocol || study.name,
    site:
      study.site || study.location,
    enrolled:
      Number(study.enrolled) || 0,
    targetSubjects:
      Number(study.targetSubjects) || 0
  };
}

export function getStudies() {
  // Codex change: studies are served through this service so mock data can later be replaced by Django APIs.
  return [
    ...defaultStudies,
    ...getStoredStudies()
  ].map(normalizeStudy);
}

export function getStudyByCode(code) {
  return getStudies().find(
    (study) => study.code === code
  );
}

export function createStudy(study) {
  const normalizedStudy =
    normalizeStudy(study);
  const storedStudies =
    getStoredStudies();

  saveStoredStudies([
    ...storedStudies,
    normalizedStudy
  ]);

  return normalizedStudy;
}

// ====== AUDIT LOGGING FUNCTIONS ======

function getAuditLogs() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(
      localStorage.getItem(
        AUDIT_LOG_KEY
      )
    ) || [];
  } catch {
    return [];
  }
}

function saveAuditLogs(logs) {
  localStorage.setItem(
    AUDIT_LOG_KEY,
    JSON.stringify(logs)
  );
}

export function addAuditLog(action, details) {
  const logs = getAuditLogs();
  const newLog = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    action: action,
    ...details
  };
  
  logs.unshift(newLog);
  // Keep only last 100 logs
  if (logs.length > 100) {
    logs.pop();
  }
  
  saveAuditLogs(logs);
  return newLog;
}

export function getRecentActivityLogs(limit = 10) {
  const logs = getAuditLogs();
  return logs.slice(0, limit);
}

// ====== DELETE FUNCTIONS ======

export function deleteStudy(studyCode, deletionDetails) {
  const storedStudies = getStoredStudies();
  const study = getStudyByCode(studyCode);
  
  if (!study) {
    throw new Error("Study not found");
  }

  // Filter out the deleted study
  const updatedStudies = storedStudies.filter(
    (s) => s.code !== studyCode
  );
  
  saveStoredStudies(updatedStudies);

  // Add audit log
  addAuditLog("STUDY_DELETED", {
    studyCode: studyCode,
    studyName: study.name,
    deletedBy: deletionDetails.deletedBy,
    reason: deletionDetails.reason,
    timestamp: new Date().toISOString()
  });

  return true;
}

export function deleteSubject(studyCode, subjectId, deletionDetails) {
  // For now, we'll add an audit log for subject deletion
  // In a real app, you'd update the subjects data structure
  
  addAuditLog("SUBJECT_DELETED", {
    studyCode: studyCode,
    subjectId: subjectId,
    deletedBy: deletionDetails.deletedBy,
    reason: deletionDetails.reason,
    timestamp: new Date().toISOString()
  });

  return true;
}
