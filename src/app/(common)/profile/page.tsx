import {
  Avatar,
  Text,
  Button,
  Paper,
  Container,
  Flex,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
} from "@mantine/core";

import PersonalDataForm from "@/features/profile/PersonalDataForm";
import { getProfile, getProvinces, getUniversities } from "@/services/profile";

import classes from "./index.module.css";
import ErrorWrapper from "@/components/layout/Error";
import { verifySession } from "@/functions/server/session";
import { Profile, Province, University, User } from "@/types/data/user";
import { USER_LEVEL_RENDER } from "@/constants/render/activity";
import PersonalActivityData from "@/features/profile/PersonalActivityData";
import { Activity, ActivityRegistration } from "@/types/data/activity";
import { getActivitiesRegistration } from "@/services/activity";

export default async function Page() {
  let provinceData: Province[] | undefined;
  let universityData: University[] | undefined;
  let profileData:
    | {
        userData: User;
        profile: Profile;
      }
    | undefined;

  let activitiesRegistration:
    | ({ activity: Activity } & ActivityRegistration)[]
    | undefined;

  const sessionData = await verifySession();

  try {
    provinceData = await getProvinces();
    universityData = await getUniversities();
    profileData = await getProfile(sessionData.session || "");
    activitiesRegistration = await getActivitiesRegistration(
      sessionData.session || "",
    );
  } catch (error: unknown) {
    if (typeof error === "string") return <ErrorWrapper message={error} />;
  }

  return (
    <main className={classes.container}>
      <Container size="lg">
        <Flex gap="xl" className={classes.content}>
          <Paper radius="md" withBorder p="lg" miw="20rem" h="fit-content">
            <Avatar size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" fw={500} mt="md">
              {profileData?.profile.name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              {profileData && USER_LEVEL_RENDER[profileData.profile.level]}
            </Text>

            <Button variant="default" c="red" fullWidth mt="md">
              Keluar
            </Button>
          </Paper>

          <Tabs
            variant="pills"
            defaultValue="profiledata"
            className={classes.tab}
          >
            <TabsList>
              <TabsTab value="profiledata">Data Diri</TabsTab>
              <TabsTab value="activity">Kegiatan</TabsTab>
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
          </Tabs>
        </Flex>
      </Container>
    </main>
  );
}
