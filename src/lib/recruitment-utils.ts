import {
  RecruitmentApplication,
  ApplicationStatus,
  RecruitmentFilters,
  WorkDay,
  Gender,
  Position,
  WorkShift,
} from "@/types/recruitment";

// Constants
export const APPLICATION_STATUSES: Record<ApplicationStatus, string> = {
  pending: "Chờ xem xét",
  reviewed: "Đã xem xét",
  contacted: "Đã liên hệ",
  hired: "Đã tuyển dụng",
  rejected: "Từ chối",
};

export const WORK_DAYS: Record<WorkDay, string> = {
  monday: "Thứ 2",
  tuesday: "Thứ 3",
  wednesday: "Thứ 4",
  thursday: "Thứ 5",
  friday: "Thứ 6",
  saturday: "Thứ 7",
  sunday: "Chủ nhật",
};

export const GENDERS: Record<Gender, string> = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
};

export const POSITIONS: Record<Position, string> = {
  cashier: "Nhân viên lễ tân",
  server: "Nhân viên phục vụ",
  parking: "Nhân viên giữ xe",
};

export const WORK_SHIFTS: Record<WorkShift, string> = {
  morning: "Ca sáng (12:00 - 17:00)",
  evening: "Ca tối (17:00 - 22:00)",
};

// Utility Functions
export const calculateAge = (birthDate: string | Date): number => {
  if (typeof birthDate === "string") {
    birthDate = new Date(birthDate);
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const formatDate = (date: Date | string): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatWorkDays = (workDays: string[]): string => {
  return workDays.map((day) => WORK_DAYS[day as WorkDay]).join(", ");
};

export const formatPositions = (positions: Position[]): string => {
  return positions.map((pos) => POSITIONS[pos]).join(", ");
};

export const formatWorkShifts = (workShifts: WorkShift[]): string => {
  return workShifts.map((shift) => WORK_SHIFTS[shift]).join(", ");
};

export const getStatusColor = (status: ApplicationStatus): string => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    contacted: "bg-purple-100 text-purple-800",
    hired: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return colors[status];
};

// Filter Functions
export const filterApplications = (
  applications: RecruitmentApplication[],
  filters: RecruitmentFilters
): RecruitmentApplication[] => {
  return applications.filter((app) => {
    // Status filter
    if (filters.status && app.status !== filters.status) return false;

    // Position filter
    if (filters.position && !app.position.includes(filters.position))
      return false;

    // Gender filter
    if (filters.gender && app.gender !== filters.gender) return false;

    // Date range filter
    if (filters.dateFrom && app.submittedAt < filters.dateFrom) return false;
    if (filters.dateTo && app.submittedAt > filters.dateTo) return false;

    // Age range filter
    const age = calculateAge(app.birthDate);
    if (filters.ageFrom && age < filters.ageFrom) return false;
    if (filters.ageTo && age > filters.ageTo) return false;

    return true;
  });
};

export const searchApplications = (
  applications: RecruitmentApplication[],
  searchTerm: string
): RecruitmentApplication[] => {
  const term = searchTerm.toLowerCase();

  return applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(term) ||
      app.phone.includes(term) ||
      (app.email && app.email.toLowerCase().includes(term)) ||
      app.socialMedia.toLowerCase().includes(term)
  );
};

export const sortApplications = (
  applications: RecruitmentApplication[],
  sortBy: "submittedAt" | "fullName" | "status" = "submittedAt",
  sortOrder: "asc" | "desc" = "desc"
): RecruitmentApplication[] => {
  return [...applications].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "submittedAt":
        comparison = a.submittedAt.getTime() - b.submittedAt.getTime();
        break;
      case "fullName":
        comparison = a.fullName.localeCompare(b.fullName);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });
};

// Statistics Functions
export const getApplicationStats = (applications: RecruitmentApplication[]) => {
  const total = applications.length;
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  const positionCounts = applications.reduce((acc, app) => {
    app.position.forEach((pos) => {
      acc[pos] = (acc[pos] || 0) + 1;
    });
    return acc;
  }, {} as Record<Position, number>);

  const genderCounts = applications.reduce((acc, app) => {
    acc[app.gender] = (acc[app.gender] || 0) + 1;
    return acc;
  }, {} as Record<Gender, number>);

  const averageAge =
    applications.length > 0
      ? applications.reduce(
          (sum, app) => sum + calculateAge(app.birthDate),
          0
        ) / applications.length
      : 0;

  return {
    total,
    statusCounts,
    positionCounts,
    genderCounts,
    averageAge: Math.round(averageAge),
  };
};

// Export Functions
export const exportToCSV = (applications: RecruitmentApplication[]): string => {
  const headers = [
    "ID",
    "Họ tên",
    "Ngày sinh",
    "Tuổi",
    "Giới tính",
    "Số điện thoại",
    "Email",
    "Facebook/Zalo",
    "Tình trạng",
    "Ngày làm việc",
    "Ca làm việc",
    "Vị trí",
    "Ngày nộp đơn",
    "Trạng thái",
  ];

  const rows = applications.map((app) => [
    app._id,
    app.fullName,
    formatDate(app.birthDate),
    calculateAge(app.birthDate),
    GENDERS[app.gender],
    app.phone,
    app.email || "",
    app.socialMedia,
    app.currentStatus === "other" ? app.otherStatus : app.currentStatus,
    formatWorkDays(app.workDays || []),
    formatWorkShifts(app.workShifts || []),
    formatPositions(app.position || []),
    formatDate(app.submittedAt),
    APPLICATION_STATUSES[app.status],
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  return csvContent;
};
