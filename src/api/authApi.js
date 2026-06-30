import api from "./axios";

export const login = (data) => {
  return api.post("/login", data);
};

export const register = (data) => {
  return api.post("Auth/register", data);
};

export async function getPolicyListByNationalNo(nationalNo) {
  return api.post("/Policy/GetPolicyListByNationalNo", {
    NationalNo: nationalNo,
  });
}

export async function getGetPolicySpcById(policyid) {
  return api.get(`/Policy/GetPolicySpcById/${policyid}`);
}

export async function getAvailablePolicyInstallment(data) {
  return api.post("/payment/getAvailablePolicyInstallment", data);
}

export async function getPaymentToken(data) {
  return api.post("/payment/getPaymentToken", data);
}