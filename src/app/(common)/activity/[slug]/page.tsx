import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Image,
  rem,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { IconCalendarTime, IconCalendarMonth } from "@tabler/icons-react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Link from "next/link";

import classes from "./index.module.css";
import {
  ACTIVITY_CATEGORY_RENDER,
  USER_LEVEL_RENDER,
} from "@/constants/render/activity";
import { verifySession } from "@/functions/server/session";
import { getActivity, getActivityRegistration } from "@/services/activity";
import { ACTIVITY_REGISTRATION_DEFAULT_ENUM } from "@/constants/enum/activity";
import { getProfile } from "@/services/profile";
import ErrorWrapper from "@/components/layout/Error";
import { Profile, User } from "@/types/data/user";
import { Activity } from "@/types/data/activity";

const calendarIcon = (
  <IconCalendarTime style={{ width: rem(12), height: rem(12) }} />
);

const calenderMonthIcon = (
  <IconCalendarMonth style={{ width: rem(12), height: rem(12) }} />
);

export default async function Page({ params }: { params: { slug: string } }) {
  let activityRegistration:
    | {
        status: string;
      }
    | undefined;

  let profileData:
    | {
        userData: User;
        profile: Profile;
      }
    | undefined;

  let activity: Activity | undefined;

  const sessionData = await verifySession();

  try {
    activity = await getActivity(params);
    profileData = await getProfile(sessionData.session || "");
    if (sessionData.session) {
      activityRegistration = await getActivityRegistration(
        sessionData.session,
        params,
      );
    }
  } catch (error: unknown) {
    if (typeof error === "string" && error !== "Unauthorized")
      return <ErrorWrapper message={error} />;
  }

  const isRegistered =
    !!activityRegistration?.status &&
    activityRegistration?.status !==
      ACTIVITY_REGISTRATION_DEFAULT_ENUM.BELUM_TERDAFTAR;

  const isLevelEligible = Boolean(
    activity &&
      profileData?.profile?.level !== undefined &&
      profileData?.profile?.level >= activity.minimum_level,
  );

  return (
    <Stack component="main" mt="xl">
      <Container size="xs">
        <Carousel
          slideGap="md"
          withIndicators
          controlsOffset={0}
          controlSize={40}
          loop
          align="start"
        >
          <CarouselSlide>
            <Image
              src="https://admin-api-kaderisasi.salmanitb.com/activity_pic/1704528106622.jpeg"
              alt="Activity Banner"
            />
          </CarouselSlide>
          <CarouselSlide>
            <Image
              src="https://admin-api-kaderisasi.salmanitb.com/activity_pic/1704528106622.jpeg"
              alt="Activity Banner"
            />
          </CarouselSlide>
          <CarouselSlide>
            <Image
              src="https://admin-api-kaderisasi.salmanitb.com/activity_pic/1704528106622.jpeg"
              alt="Activity Banner"
            />
          </CarouselSlide>
        </Carousel>
      </Container>
      <Container size="md" className={classes.header}>
        <Card className={classes.title} padding="lg" radius="md" withBorder>
          <Title order={2}>{activity?.name}</Title>
          <Group gap={7} mt={10}>
            <Badge variant="light">
              {activity ? USER_LEVEL_RENDER[activity.minimum_level] : ""}
            </Badge>
            <Badge variant="light">
              {activity
                ? ACTIVITY_CATEGORY_RENDER[activity.activity_category]
                : ""}
            </Badge>
            <Badge variant="light" leftSection={calenderMonthIcon}>
              {activity?.activity_start}
            </Badge>
            {isRegistered && (
              <Badge color="red" leftSection={calendarIcon}>
                {activity?.registration_end}
              </Badge>
            )}
          </Group>
        </Card>
        <Card className={classes.control} padding="lg" radius="md" withBorder>
          {isRegistered ? (
            <Stack gap="xs">
              <Title order={5} ta="center">
                Status Pendaftaran
              </Title>
              <Badge m="auto" size="lg" px="xl">
                {activityRegistration?.status}
              </Badge>
            </Stack>
          ) : (
            <Stack gap="xs">
              <Title order={5} ta="center">
                Tutup Pendaftaran
              </Title>
              <Badge m="auto" color="red" leftSection={calendarIcon}>
                {activity?.registration_end}
              </Badge>
            </Stack>
          )}

          {sessionData.session ? (
            !isRegistered ? (
              !isLevelEligible ? (
                <Button disabled>Jenjang Tidak Cukup</Button>
              ) : (
                <Button
                  component={Link}
                  href={`/activity/register/${params.slug}/profile-data`}
                >
                  Daftar Kegiatan
                </Button>
              )
            ) : null
          ) : (
            <Stack gap="xs">
              <Text size="xs" c="dimmed">
                Silahkan masuk terlebih dahulu
              </Text>
              <Button component={Link} href="/login">
                Masuk
              </Button>
            </Stack>
          )}
        </Card>
      </Container>
      <Container size="md">
        <Card withBorder radius="md">
          <Title ta="center" mt="sm">
            Deskripsi
          </Title>
          <div
            dangerouslySetInnerHTML={{ __html: activity?.description || "" }}
          />
        </Card>
      </Container>
    </Stack>
  );
}
