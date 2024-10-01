import { PROBLEM_OWNER_ENUM, PROBLEM_STATUS_ENUM } from "../enum/ruangcurhat";

export const PROBLEM_OWNER_RENDER = {
  [PROBLEM_OWNER_ENUM.DIRI_SENDIRI]: "Jamaah",
  [PROBLEM_OWNER_ENUM.TEMAN]: "Aktivis",
} as const;

export const PROBLEM_STATUS_RENDER = {
  [PROBLEM_STATUS_ENUM.BELUM_DITANGANI]: "Belum Ditangani",
  [PROBLEM_STATUS_ENUM.SEDANG_DITANGANI]: "Sedang Ditangani",
  [PROBLEM_STATUS_ENUM.SUDAH_DITANGANI]: "Sudah Ditangani",
  [PROBLEM_STATUS_ENUM.BATAL]: "Batal",
} as const;

export const PROBLEM_STATUS_RENDER_COLOR = {
  [PROBLEM_STATUS_ENUM.BELUM_DITANGANI]: "grey",
  [PROBLEM_STATUS_ENUM.SEDANG_DITANGANI]: "yellow",
  [PROBLEM_STATUS_ENUM.SUDAH_DITANGANI]: "blue",
  [PROBLEM_STATUS_ENUM.BATAL]: "red",
} as const;
