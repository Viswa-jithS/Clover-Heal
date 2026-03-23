import emailjs from "@emailjs/browser";

const SERVICE_ID  = "service_ysghy17";
const PUBLIC_KEY  = "5nk6VN_Y6N05PToI3";

// Separate credentials for sending diagnosis result to patients
const VERIFY_SERVICE_ID = "service_irix3b9";
const VERIFY_PUBLIC_KEY = "IjlLWdS4NKSXm-WNM";

// Template for notifying admin of new case (existing)
const NEW_CASE_TEMPLATE  = "template_new_case";
// Template for sending diagnosis result to the patient
const VERIFY_TEMPLATE    = "template_l0seuuh";

/**
 * Notify admin when a new case is submitted (called from user app).
 */
export const notifyAdminNewCase = async (payload: any) => {
  return emailjs.send(
    SERVICE_ID,
    NEW_CASE_TEMPLATE,
    {
      user_name:       payload.personal_info?.name  || "Patient",
      user_email:      payload.personal_info?.email || "Unknown",
      primary_symptom: payload.symptoms?.[0]         || "Unknown",
      severity:        payload.answers?.severity      || "Unknown",
    },
    PUBLIC_KEY
  );
};

/**
 * Send verified diagnosis result to the patient (called from admin app on verify).
 */
export const sendVerificationEmail = async (params: {
  patient_name:   string;
  patient_email:  string;
  diagnosis:      string;
  severity:       string;
  doctor_comment: string;
  case_id:        number;
}) => {
  return emailjs.send(
    VERIFY_SERVICE_ID,
    VERIFY_TEMPLATE,
    {
      patient_name:      params.patient_name,
      patient_email:     params.patient_email,
      diagnosis:         params.diagnosis,
      severity:          params.severity,
      doctor_comment:    params.doctor_comment,
      case_id:           String(params.case_id),
    },
    VERIFY_PUBLIC_KEY
  );
};
