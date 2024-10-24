import {
  Badge,
  Card,
  Group,
  Title,
  Accordion,
  Text,
  rem,
  Avatar,
  Stack,
  Paper,
} from "@mantine/core";
import { IconCalendarTime } from "@tabler/icons-react";

import {
  PROBLEM_OWNER_ENUM,
  PROBLEM_STATUS_ENUM,
} from "@/constants/enum/ruangcurhat";
import {
  PROBLEM_OWNER_RENDER,
  PROBLEM_STATUS_RENDER,
  PROBLEM_STATUS_RENDER_COLOR,
} from "@/constants/render/ruangcurhat";
import { RuangCurhatData } from "@/types/data/ruangcurhat";

type RuangCurhatCardProps = {
  data: RuangCurhatData;
};

export default function RuangCurhatCard({ data }: RuangCurhatCardProps) {
  const calenderIcon = (
    <IconCalendarTime style={{ width: rem(12), height: rem(12) }} />
  );

  return (
    <Card withBorder radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Title order={4}>
            {PROBLEM_OWNER_RENDER[data.problem_owner as PROBLEM_OWNER_ENUM]}
          </Title>
          <Badge
            color={
              PROBLEM_STATUS_RENDER_COLOR[data.status as PROBLEM_STATUS_ENUM]
            }
          >
            {PROBLEM_STATUS_RENDER[data.status as PROBLEM_STATUS_ENUM]}
          </Badge>
        </Group>
        <Group gap={7} mt={5}>
          <Badge variant="light" color="blue" leftSection={calenderIcon}>
            {data.created_at}
          </Badge>
          <Badge size="sm" variant="light" color="yellow">
            {data.handling_technic}
          </Badge>
          <Badge size="sm" variant="light" color="purple">
            {data.problem_category}
          </Badge>
        </Group>
      </Card.Section>
      <Card.Section>
        <Accordion variant="default">
          {data.problem_owner === PROBLEM_OWNER_ENUM.TEMAN ? (
            <Accordion.Item key="problem_owner" value="problem_owner">
              <Accordion.Control>
                <Title order={5}>Pemilik Masalah</Title>
              </Accordion.Control>
              <Accordion.Panel>{data.owner_name}</Accordion.Panel>
            </Accordion.Item>
          ) : undefined}

          <Accordion.Item key="counselor" value="counselor">
            <Accordion.Control>
              <Title order={5}>Konselor</Title>
            </Accordion.Control>
            {data.adminUser ? (
              <>
                <Accordion.Panel>
                  <Stack>
                    <Text size="sm">
                      Konselor berikut telah ditugaskan untuk membantu mu.
                    </Text>
                    <Paper shadow="xs" p="sm">
                      <Group>
                        <Avatar radius="xl" />
                        <div>
                          <Text size="sm" fw={500}>
                            {data.adminUser?.display_name}
                          </Text>
                          <Text c="dimmed" size="xs">
                            {data.adminUser?.email}
                          </Text>
                        </div>
                      </Group>
                    </Paper>
                  </Stack>
                </Accordion.Panel>
              </>
            ) : (
              <>
                <Accordion.Panel>
                  <Text size="sm">Belum ada konselor yang ditugaskan</Text>
                </Accordion.Panel>
              </>
            )}
          </Accordion.Item>
          <Accordion.Item key="description" value="description">
            <Accordion.Control>
              <Title order={5}>Deskripsi Masalah</Title>
            </Accordion.Control>
            <Accordion.Panel>{data.problem_description}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
}
