"use client";

import { Button, Select, Textarea } from "@mantine/core";

import { useForm } from "@mantine/form";

import classes from "./index.module.css";
import { useState } from "react";
import { postRuangCurhat } from "@/services/ruangcurhat";
import showNotif from "@/functions/common/notification";
import { PROBLEM_OWNER_OPTIONS } from "@/constants/form/ruangcurhat";

type RegistrationFormProps = {
  token: string;
};

type RegistrationFormItems = {
  problem_owner: string;
  category: string;
  problem_description: string;
  handling_type: string;
  preferred_conselor: string;
};

export default function RegistrationForm({ token }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      problem_owner: "",
      category: "",
      problem_description: "",
      handling_type: "",
      preferred_conselor: "",
    },
  });

  const handleRegistration = async (val: RegistrationFormItems) => {
    try {
      setLoading(true);
      const resp = await postRuangCurhat(token, {
        ...val,
        problem_owner: Number(val.problem_owner),
      });
      if (resp) {
        showNotif(resp.message);
        form.reset();
      }
    } catch (error: unknown) {
      if (error instanceof Error) showNotif(error.message, true);
      if (typeof error === "string") showNotif(error, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((val) => handleRegistration(val))}
    >
      <Select
        {...form.getInputProps("problem_owner")}
        key={form.key("problem_owner")}
        label="Pemilik Masalah"
        placeholder="Pilih Pemilik Masalah"
        data={PROBLEM_OWNER_OPTIONS}
        required
      />
      <Select
        {...form.getInputProps("category")}
        key={form.key("category")}
        label="Kategori Masalah"
        placeholder="Pilih Kategori Masalah"
        data={[
          "Akademik",
          "Kesehatan Mental",
          "Keluarga",
          "Sosial",
          "Pengembangan Diri",
          "Lainnya",
        ]}
        required
      />
      <Textarea
        {...form.getInputProps("problem_description")}
        key={form.key("problem_description")}
        label="Deskripsi masalah yang akan didiskusikan"
        placeholder="Ketikkan detil masalah anda"
        required
      />
      <Select
        {...form.getInputProps("handling_type")}
        key={form.key("handling_type")}
        label="Teknik Penanganan"
        placeholder="Pilih Teknik Penanganan"
        data={["Online", "Langsung Bertemu"]}
        required
      />
      <Select
        {...form.getInputProps("preferred_conselor")}
        key={form.key("preferred_conselor")}
        label="Preferensi Konselor"
        placeholder="Pilih Preferensi Konselor"
        data={["Laki-Laki", "Perempuan"]}
        required
      />
      <Button
        loading={loading}
        disabled={loading}
        w="100%"
        type="submit"
        mt="md"
      >
        Kirim
      </Button>
    </form>
  );
}
