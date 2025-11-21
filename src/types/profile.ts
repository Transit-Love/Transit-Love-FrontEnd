export interface Profile {
  avatar: string;
  name: string;
  keywords: string[];
  balanceResults: {
    icon: string;
    category: string;
    result: string;
  }[];
}
