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
