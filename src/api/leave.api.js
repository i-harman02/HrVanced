import api from "./axios";

export const applyLeaveApi = (formData) => {
  return api.post("/leave/apply-leave", formData);
};

export const getMyLeavesApi = (params = {}) => {
  return api.get("/leave/all-leaves/me", { params });
};

export const getLeaveHistoryApi = () => {
  return api.get("/leave/history/me");
};

export const getLeaveStatsApi = () => {
  return api.get("/leave/stats/me");
};

export const getLeaveBalanceApi = () => {
  return api.get("/leave/balance/me");
};

export const getRequestedLeavesApi = (id, params = {}) => {
  if (id === "all") {
    return api.get("/leave/all-requested-leaves", { params });
  }
  return api.get(`/leave/requested/${id}`, { params });
};

export const updateLeaveStatusApi = (payload) => {
  return api.put("/leave/status-update", payload);
};

export const getTodayLeavesApi = () => {
  return api.get("/leave/on-leave");
};
