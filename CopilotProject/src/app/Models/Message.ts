export interface Message {
  id: string;
  tenantId: string;
  landLordId: string;
  messages: MessageDetails[];
}

export interface MessageDetails {
  date: Date;
  from: string;
  message: string;
}
