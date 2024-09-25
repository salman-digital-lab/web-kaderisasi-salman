import { Profile, Province, University, User } from "../data/user";
import { APIPagiResponse, APIResponse } from "../helper";

export type GetProvincesResp = APIResponse<Province[]>;

export type GetUniversitiesResp = APIPagiResponse<University>;

export type GetProfileResp = APIResponse<{ userData: User; profile: Profile }>;

export type PutProfileReq = Partial<Profile>;

export type PutProfileResp = APIResponse<Profile>;
