"use client";

import RuangCurhatCard from "@/components/common/RuangCurhatCard";
import { RuangCurhatData } from "@/types/data/ruangcurhat";
import { Paper } from "@mantine/core";

type PersonalActivityDataProps = {
  data: RuangCurhatData[];
};

export default function RuangCurhatList({ data }: PersonalActivityDataProps) {
  return (
    <Paper radius="md" withBorder p="lg">
      {data.map((item) => (
        <RuangCurhatCard key={item.id} data={item} />
      ))}
    </Paper>
  );
}
