export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+92|0)?3\d{9}$/;
const URL_RE = /^https?:\/\/.+/i;

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function required(value: string, label: string) {
  if (!value.trim()) return `${label} is required.`;
  return null;
}

export function minLength(value: string, min: number, label: string) {
  if (value.trim().length < min) return `${label} must be at least ${min} characters.`;
  return null;
}

export function maxLength(value: string, max: number, label: string) {
  if (value.trim().length > max) return `${label} must be at most ${max} characters.`;
  return null;
}

export function isEmail(value: string, label = "Email") {
  const empty = required(value, label);
  if (empty) return empty;
  if (!EMAIL_RE.test(value.trim())) return `Enter a valid ${label.toLowerCase()}.`;
  return null;
}

export function isPhonePK(value: string, label = "Phone") {
  const empty = required(value, label);
  if (empty) return empty;
  const cleaned = value.replace(/[\s-]/g, "");
  if (!PHONE_RE.test(cleaned)) {
    return `${label} must be a valid Pakistani mobile number (e.g. 03XXXXXXXXX).`;
  }
  return null;
}

export function isOptionalUrl(value: string, label: string) {
  if (!value.trim()) return null;
  if (!URL_RE.test(value.trim())) return `${label} must start with http:// or https://.`;
  return null;
}

export function passwordRules(value: string) {
  const empty = required(value, "Password");
  if (empty) return empty;
  if (value.length < 6) return "Password must be at least 6 characters.";
  return null;
}

export function passwordsMatch(password: string, confirm: string) {
  if (password !== confirm) return "Passwords do not match.";
  return null;
}

export function minWords(value: string, min: number, label: string) {
  const words = countWords(value);
  if (words < min) return `${label} must be at least ${min} words (currently ${words}).`;
  return null;
}

export function firstError(...errors: Array<string | null | undefined>) {
  return errors.find((e) => Boolean(e)) || null;
}

export function validateContactForm(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const errors: FieldErrors = {};
  const nameErr = firstError(required(input.name, "Name"), minLength(input.name, 2, "Name"));
  const emailErr = isEmail(input.email);
  const subjectErr = required(input.subject, "Subject");
  const messageErr = firstError(
    required(input.message, "Message"),
    minLength(input.message, 20, "Message"),
  );
  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (subjectErr) errors.subject = subjectErr;
  if (messageErr) errors.message = messageErr;
  return {
    ok: Object.keys(errors).length === 0,
    errors,
    message: Object.values(errors)[0] || null,
  };
}

export function validateSignUpForm(input: {
  name: string;
  email: string;
  password: string;
  confirm: string;
}) {
  const errors: FieldErrors = {};
  const nameErr = firstError(required(input.name, "Name"), minLength(input.name, 2, "Name"));
  const emailErr = isEmail(input.email);
  const passwordErr = passwordRules(input.password);
  const confirmErr = firstError(required(input.confirm, "Confirm password"), passwordsMatch(input.password, input.confirm));
  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (passwordErr) errors.password = passwordErr;
  if (confirmErr) errors.confirm = confirmErr;
  return {
    ok: Object.keys(errors).length === 0,
    errors,
    message: Object.values(errors)[0] || null,
  };
}

export function validateSignInForm(input: { email: string; password: string }) {
  const errors: FieldErrors = {};
  const emailErr = isEmail(input.email);
  const passwordErr = required(input.password, "Password");
  if (emailErr) errors.email = emailErr;
  if (passwordErr) errors.password = passwordErr;
  return {
    ok: Object.keys(errors).length === 0,
    errors,
    message: Object.values(errors)[0] || null,
  };
}

export function validateInternshipApplyForm(input: {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  address: string;
  semester: string;
  city: string;
  portfolio?: string;
  linkedin?: string;
  motivation?: string;
}) {
  const errors: FieldErrors = {};
  const checks: Array<[keyof typeof errors, string | null]> = [
    ["fullName", firstError(required(input.fullName, "Full name"), minLength(input.fullName, 2, "Full name"))],
    ["email", isEmail(input.email)],
    ["phone", isPhonePK(input.phone)],
    ["university", required(input.university, "University")],
    ["address", firstError(required(input.address, "Address"), minLength(input.address, 8, "Address"))],
    ["semester", required(input.semester, "Semester")],
    ["city", required(input.city, "City")],
    ["portfolio", isOptionalUrl(input.portfolio || "", "Portfolio")],
    ["linkedin", isOptionalUrl(input.linkedin || "", "LinkedIn")],
  ];
  for (const [key, err] of checks) {
    if (err) errors[key] = err;
  }
  return {
    ok: Object.keys(errors).length === 0,
    errors,
    message: Object.values(errors)[0] || null,
  };
}
