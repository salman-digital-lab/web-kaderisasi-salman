import { Profile, Token, User } from "../data/user";
import { APIResponse } from "../helper";

export type LoginResp = APIResponse<{
  user: User;
  data: Profile;
  token: Token;
}>;

export type RegisterResp = APIResponse<User>;
