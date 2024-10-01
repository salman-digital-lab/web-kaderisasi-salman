import { RuangCurhatData } from "../data/ruangcurhat";
import { APIResponse } from "../helper";

export type PostRuangCurhatReq = Partial<RuangCurhatData>;

export type PostRuangCurhatResp = APIResponse<RuangCurhatData>;

export type GetRuangCurhatResp = APIResponse<RuangCurhatData[]>;
