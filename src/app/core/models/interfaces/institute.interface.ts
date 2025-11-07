export interface Institute {
  instituteId: number;
  name: string;
  conatctNo: string;
  emailId: string;
  city: string;
  pincode: string;
  state: string;
  location: string;
  ownerName: string;
  createdDate: string;
  gstNo: string;
}

export interface InstituteResponse {
  message: string;
  data: Institute[];
}
