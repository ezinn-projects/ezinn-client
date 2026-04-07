// Recruitment Types
export interface RecruitmentFormData {
  fullName: string;
  birthDate: string; // Format: dd/mm/yyyy
  gender: "male" | "female" | "other";
  phone: string;
  email?: string | null;
  socialMedia: string;
  currentStatus: "student" | "working" | "other";
  otherStatus?: string;
  position: Position[];
  workShifts: WorkShift[];
}

export interface RecruitmentApplication extends RecruitmentFormData {
  _id: string;
  submittedAt: Date;
  status: ApplicationStatus;
  // birthDate is stored as string in form but converted to Date in database
  birthDate: string | Date;
  workDays?: string[]; // Optional for backward compatibility
  position: Position[]; // Changed from string to array
}

// Alias for backward compatibility
export type Application = RecruitmentApplication;

export type ApplicationStatus =
  | "pending" // Chờ xem xét
  | "reviewed" // Đã xem xét
  | "contacted" // Đã liên hệ
  | "hired" // Đã tuyển dụng
  | "rejected"; // Từ chối

export type WorkDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Gender = "male" | "female" | "other";
export type Position = "cashier" | "server" | "parking";
export type CurrentStatus = "student" | "working" | "other";
export type WorkShift = "shift_9_14" | "shift_14_19" | "shift_19_1";

// API Response Types
export interface RecruitmentApiResponse {
  success: boolean;
  message: string;
  applicationId?: string;
}

export interface RecruitmentErrorResponse {
  error: string;
  details?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}

export interface GetApplicationsResponse {
  applications: RecruitmentApplication[];
}

// Filter and Search Types
export interface RecruitmentFilters {
  status?: ApplicationStatus;
  position?: Position;
  gender?: Gender;
  dateFrom?: Date;
  dateTo?: Date;
  ageFrom?: number;
  ageTo?: number;
}

export interface RecruitmentSearchParams {
  search?: string; // Search by name, phone, email
  filters?: RecruitmentFilters;
  page?: number;
  limit?: number;
  sortBy?: "submittedAt" | "fullName" | "status";
  sortOrder?: "asc" | "desc";
}
