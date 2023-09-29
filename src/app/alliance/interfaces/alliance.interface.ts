export interface IAlliance {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  initialDate: string;
  endDate: string;
  createdAt: string;
  allianceCategoryId: string;
  allianceCategory: IAllianceCategory;
}

interface IAllianceCategory {
  name: string;
}
