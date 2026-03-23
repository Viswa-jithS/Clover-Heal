import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_ysghy17";
const TEMPLATE_ID = "template_new_case";
const PUBLIC_KEY = "5nk6VN_Y6N05PToI3";

export const notifyAdmin = async (payload: any) => {

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      user_name: payload.personal_info?.name || "Patient",
      user_email: payload.personal_info?.email || "Unknown",
      primary_symptom: payload.symptoms?.[0] || "Unknown",
      severity: payload.answers?.severity || "Unknown",
      admin_email: payload.admin_email || "admin@cloverheal.com"
    },
    PUBLIC_KEY
  );

};