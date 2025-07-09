export type LoginRequest = {
  email: string;
  password: string;
};

export interface LoginResponse {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  tokenType: "Bearer";
  role: string;
}

export interface StandardUserLoginResponse extends LoginResponse {
  name: string;
  surname: string;
  workRole: string;
  phoneNumber: string;
  bio: string;
}
