export interface Package {
  packageId: number;
  packageName: string;
  oneTimeTotalCost: number;
  emiTotalCost: string;
  maxBranches: number;
  maxStudents: number;
  isSmsAlert: boolean;
}
export interface PackageResponse {
  message: string;
  data: Package[];
}
