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
  portfolios: PortfolioTypes[];
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
  authors: TeamateTypes[];
  tags: string[];
}

export interface CareerTypes {
  _id?: string;
  name: string;
  salary: {
    from: number;
    to: number;
  };
  requirements: string[];
  tasks: string[];
}
