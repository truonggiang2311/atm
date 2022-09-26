export interface Atm {
  id: string;
  status: 'Free' | 'Busy';
  remove: boolean;
  name: string;
  processedClientsAtm: Array<string>;
  client: string;
  transaction: number;
}
