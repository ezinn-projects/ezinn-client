import { useState, useEffect, useCallback } from "react";
import {
  RecruitmentApplication,
  RecruitmentFilters,
} from "@/types/recruitment";
import {
  filterApplications,
  searchApplications,
  sortApplications,
  getApplicationStats,
} from "@/lib/recruitment-utils";

interface UseRecruitmentReturn {
  applications: RecruitmentApplication[];
  filteredApplications: RecruitmentApplication[];
  stats: ReturnType<typeof getApplicationStats>;
  loading: boolean;
  error: string | null;
  filters: RecruitmentFilters;
  searchTerm: string;
  sortBy: "submittedAt" | "fullName" | "status";
  sortOrder: "asc" | "desc";
  setFilters: (filters: RecruitmentFilters) => void;
  setSearchTerm: (term: string) => void;
  setSortBy: (sortBy: "submittedAt" | "fullName" | "status") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  refreshApplications: () => Promise<void>;
  updateApplicationStatus: (id: string, status: string) => Promise<void>;
}

export const useRecruitment = (): UseRecruitmentReturn => {
  const [applications, setApplications] = useState<RecruitmentApplication[]>(
    []
  );
  const [filteredApplications, setFilteredApplications] = useState<
    RecruitmentApplication[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RecruitmentFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"submittedAt" | "fullName" | "status">(
    "submittedAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/recruitment");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      const appsWithDates = data.applications.map(
        (
          app: RecruitmentApplication & {
            birthDate: string;
            submittedAt: string;
          }
        ) => ({
          ...app,
          birthDate: new Date(app.birthDate),
          submittedAt: new Date(app.submittedAt),
        })
      );

      setApplications(appsWithDates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update application status
  const updateApplicationStatus = useCallback(
    async (id: string, status: string) => {
      try {
        const response = await fetch(`/api/recruitment/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        // Refresh applications after update
        await fetchApplications();
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    },
    [fetchApplications]
  );

  // Apply filters, search, and sort
  useEffect(() => {
    let result = [...applications];

    // Apply search
    if (searchTerm) {
      result = searchApplications(result, searchTerm);
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      result = filterApplications(result, filters);
    }

    // Apply sort
    result = sortApplications(result, sortBy, sortOrder);

    setFilteredApplications(result);
  }, [applications, filters, searchTerm, sortBy, sortOrder]);

  // Calculate stats
  const stats = getApplicationStats(applications);

  // Initial fetch
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    filteredApplications,
    stats,
    loading,
    error,
    filters,
    searchTerm,
    sortBy,
    sortOrder,
    setFilters,
    setSearchTerm,
    setSortBy,
    setSortOrder,
    refreshApplications: fetchApplications,
    updateApplicationStatus,
  };
};

// Hook for single application
export const useApplication = (id: string) => {
  const [application, setApplication] = useState<RecruitmentApplication | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/recruitment/${id}`);
        if (!response.ok) {
          throw new Error("Application not found");
        }

        const data = await response.json();
        setApplication({
          ...data,
          birthDate: new Date(data.birthDate),
          submittedAt: new Date(data.submittedAt),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  return { application, loading, error };
};
