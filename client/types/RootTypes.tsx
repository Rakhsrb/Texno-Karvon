export interface UserTypes {
  _id: string;
  fullName: string;
  password: string;
  phoneNumber: string;
}

export interface TeamateTypes {
  _id: string;
  fullName: string;
  biography: string;
  role: string;
  photo: string;
  skills: string[];
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
  authors: TeamateTypes[];
}
