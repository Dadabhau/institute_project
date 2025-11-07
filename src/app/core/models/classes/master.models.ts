// Interface (for type safety)
export interface MasterInterface {
  masterId: number;
  masterFor: string;
  masterValue: string;
}

export interface MasterResponse {
  message: string;
  data: MasterInterface[];
}

// // Class (optional, if you need methods or instances)
// export class MasterModel implements MasterInterface {
//   constructor(public masterId: number, public masterFor: string, public masterValue: string) {}
// }
