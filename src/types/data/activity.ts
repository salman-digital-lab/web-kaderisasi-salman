import {
  ACTIVITY_CATEGORY_ENUM,
  USER_LEVEL_ENUM,
} from "@/constants/enum/activity";

export type QuestionnaireSchema =
  | {
      type: "text" | "number";
      label: string;
      name: string;
      required: boolean;
    }
  | {
      type: "dropdown";
      label: string;
      name: string;
      required: boolean;
      data: { label: string; value: string }[];
    };

export type Activity = {
  id: number;
  name: string;
  slug: string;
  description: string;
  activity_start: string;
  activity_end: string;
  registration_start: string;
  registration_end: string;
  selection_start: string;
  selection_end: string;
  minimum_level: USER_LEVEL_ENUM;
  additional_config: {
    additional_questionnaire: QuestionnaireSchema[];
    images: string[];
    mandatory_profile_data: { name: string; required: boolean }[];
  };
  activity_category: ACTIVITY_CATEGORY_ENUM;
};

export type ActivityRegistration = {
  user_id: string;
  activity_id: string;
  status: string;
  questionnaire_answer: Record<string, string>[];
};
