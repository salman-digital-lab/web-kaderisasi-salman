"use client";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import PersonalDataForm from "../PersonalDataForm";
import PersonalActivityData from "../PersonalActivityData";

import classes from "./index.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import RuangCurhatList from "../RuangCurhatList";
import { Activity, Registrant } from "@/types/model/activity";
import { Province } from "@/types/model/province";
import { RuangCurhatData } from "@/types/model/ruangcurhat";
import { University } from "@/types/model/university";
import { Member, PublicUser } from "@/types/model/members";

type ProfileTabProps = {
  provinceData: Province[] | undefined;
  universityData: University[] | undefined;
  profileData:
    | {
        userData: PublicUser;
        profile: Member;
      }
    | undefined;
  activitiesRegistration: ({ activity: Activity } & Registrant)[] | undefined;
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
