export interface Property {
  id: string;
  location: string;
  landLordId: string;
  rent: number;
  description: string;
  type: string;
  numOfRooms: number;
  isAvailable: boolean;
  availableFrom: Date;
  ameneties: string[];
  images: string[];
}
