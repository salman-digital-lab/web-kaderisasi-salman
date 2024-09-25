"use client";

import Image from "next/image";
import {
  Button,
  Container,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./index.module.css";
import illustration from "@/assets/homepage-1.svg";
import { hasLength, isEmail, useForm } from "@mantine/form";

export default function Home() {
  const form = useForm({
    initialValues: {
      problem_owner: "",
      category: "",
      problem_description: "",
      handling_type: "",
      preferred_conselor: "",
    },
  });

  return (
    <main>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <h1 className={classes.title}>
              Ruang Curhat{" "}
              <Text component="span" c="blue" inherit>
                Kaderisasi Salman
              </Text>
            </h1>
            <Text c="dimmed" mt="md">
              Ruang Curhat merupakan layanan konseling sebaya yang diberikan
              oleh sesama Aktivis Salman. Aktivis Salman yang akan membersamai
              kamu, sudah mendapatkan pelatihan dan bekal-bekal pengetahuan
              psikologi praktis untuk menjadi seorang konselor lho.
            </Text>
          </div>
          <Image
            width={400}
            src={illustration}
            alt="Selamat Datang di BMKA Salman ITB"
            priority
            className={classes.image}
          />
        </div>
      </Container>

      <Container size="lg" py="xl">
        <Title ta="center" mt="sm">
          Pendaftaran Sesi Konsultasi
        </Title>

        <Text
          c="dimmed"
          className={classes.description_list}
          ta="center"
          mt="md"
        >
          Silahkan mengisi formulir untuk mendapatkan sesi konseling sebaya
          dengan Aktivis Salman. Setelah anda berhasil mengirim formulir,
          Aktivis akan ditunjuk dan langsung menghubungi anda.
        </Text>

        <Container size="sm">
          <form
            className={classes.form}
            onSubmit={form.onSubmit((val) => console.log(val))}
          >
            <Select
              {...form.getInputProps("problem_owner")}
              key={form.key("problem_owner")}
              label="Pemilik Masalah"
              placeholder="Pilih Pemilik Masalah"
              data={["Diri Sendiri", "Teman"]}
            />
            <Select
              {...form.getInputProps("category")}
              key={form.key("category")}
              label="Pemilik Masalah"
              placeholder="Pilih Pemilik Masalah"
              data={["Diri Sendiri", "Teman"]}
            />
            <Textarea
              {...form.getInputProps("problem_description")}
              key={form.key("problem_description")}
              label="Deskripsi masalah yang akan didiskusikan"
              placeholder="Ketikkan detil masalah anda"
            />
            <Select
              {...form.getInputProps("handling_type")}
              key={form.key("handling_type")}
              label="Teknik Penanganan"
              placeholder="Pilih Teknik Penanganan"
              data={["Online", "Langsung Bertemu"]}
            />
            <Select
              {...form.getInputProps("preferred_conselor")}
              key={form.key("preferred_conselor")}
              label="Preferensi Konselor"
              placeholder="Pilih Preferensi Konselor"
              data={["Laki-Laki", "Perempuan", "Keduanya"]}
            />
            <Button w="100%" type="submit" mt="md">
              Kirim
            </Button>
          </form>
        </Container>
      </Container>
    </main>
  );
}
