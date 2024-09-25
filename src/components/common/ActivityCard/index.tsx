"use client";

import Link from "next/link";
import { Card, Image, Text, Group, Badge, Button, rem } from "@mantine/core";
import classes from "./index.module.css";
import { USER_LEVEL_ENUM } from "@/constants/enum/activity";
import { USER_LEVEL_RENDER } from "@/constants/render/activity";
import { IconCalendarTime } from "@tabler/icons-react";

type ActivityCardProps = {
  activityName: string;
  registrationEnd: string;
  slug: string;
  minimumLevel: USER_LEVEL_ENUM;
};

export default function ActivityCard({
  activityName,
  registrationEnd,
  slug,
  minimumLevel,
}: ActivityCardProps) {
  const calenderIcon = (
    <IconCalendarTime style={{ width: rem(12), height: rem(12) }} />
  );

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src="https://admin-api-kaderisasi.salmanitb.com/activity_pic/1704528106622.jpeg"
          alt={activityName}
          height={350}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md" flex="1">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {activityName}
          </Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Information
        </Text>
        <Group gap={7} mt={5}>
          <Badge variant="light" color="red" leftSection={calenderIcon}>
            {registrationEnd}
          </Badge>
          <Badge size="sm" variant="light">
            {USER_LEVEL_RENDER[minimumLevel]}
          </Badge>
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button
          component={Link}
          href={`/activity/${slug}`}
          radius="md"
          style={{ flex: 1 }}
        >
          Lihat Detil
        </Button>
      </Group>
    </Card>
  );
}
