export interface IAuth {
    token: string; 
    id: number;
    email: string;
    name: string;
  }

export type AuthContextType = {
   auth: IAuth | null;
   setAuth: (isAuth: IAuth) => void
};