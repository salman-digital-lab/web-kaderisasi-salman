"use client";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import PersonalDataForm from "../PersonalDataForm";
import PersonalActivityData from "../PersonalActivityData";

import classes from "./index.module.css";
import { Profile, Province, University, User } from "@/types/data/user";
import { Activity, ActivityRegistration } from "@/types/data/activity";
import { useRouter, useSearchParams } from "next/navigation";
import RuangCurhatList from "../RuangCurhatList";
import { RuangCurhatData } from "@/types/data/ruangcurhat";

type ProfileTabProps = {
  provinceData: Province[] | undefined;
  universityData: University[] | undefined;
  profileData:
    | {
        userData: User;
        profile: Profile;
      }
    | undefined;
  activitiesRegistration:
    | ({ activity: Activity } & ActivityRegistration)[]
    | undefined;
  ruangcurhatData: RuangCurhatData[] | undefined;
};

export function ProfileTab({
  provinceData,
  universityData,
  profileData,
  activitiesRegistration,
  ruangcurhatData,
}: ProfileTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const onChangeTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", String(value));

    router.push("/profile?" + params, { scroll: false });
  };

  return (
    <Tabs
      variant="pills"
      defaultValue={currentTab ?? "profiledata"}
      className={classes.tab}
      onChange={(val) => onChangeTab(val || "")}
    >
      <TabsList>
        <TabsTab value="profiledata">Data Diri</TabsTab>
        <TabsTab value="activity">Kegiatan</TabsTab>
        <TabsTab value="ruangcurhat">Ruang Curhat</TabsTab>
      </TabsList>
      <TabsPanel value="profiledata" mt="md">
        <PersonalDataForm
          provinces={provinceData}
          universities={universityData}
          profileData={profileData}
        />
      </TabsPanel>
      <TabsPanel value="activity" mt="md">
        <PersonalActivityData activities={activitiesRegistration || []} />
      </TabsPanel>
      <TabsPanel value="ruangcurhat" mt="md">
        <RuangCurhatList data={ruangcurhatData || []} />
      </TabsPanel>
    </Tabs>
  );
}
