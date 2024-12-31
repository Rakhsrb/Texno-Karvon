export interface UserTypes {
  fullName: string;
  password: string;
  phoneNumber: string;
  _id: string;
}

export interface PortfolioTypes {
  _id: string;
  title: string;
  description: string;
  category: string;
  likeCount: number;
  photo: string;
  link: string;
  tags: string[];
}
