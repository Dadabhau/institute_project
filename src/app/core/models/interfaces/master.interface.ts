export interface Master {
  masterId: number;
  masterFor: string;
  masterValue: string;
}

export interface MasterResponse {
  message: string;
  data: Master[];
}
