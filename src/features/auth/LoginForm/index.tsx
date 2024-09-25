"use client";

import showNotif from "@/functions/common/notification";
import login from "@/functions/server/login";
import { PasswordInput, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    mode: "controlled",
    initialValues: { password: "", email: "" },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const handleLogin = async (loginFormData: {
    email: string;
    password: string;
  }) => {
    try {
      const message = await login(loginFormData);
      if (message) showNotif("Anda berhasil masuk");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) showNotif(error.message, true);
    }
  };

  return (
    <form id="login-form" onSubmit={form.onSubmit((val) => handleLogin(val))}>
      <TextInput
        {...form.getInputProps("email")}
        key={form.key("email")}
        label="Email"
        placeholder="Email Anda"
        required
      />
      <PasswordInput
        {...form.getInputProps("password")}
        key={form.key("password")}
        label="Password"
        placeholder="Password Anda"
        required
        mt="md"
      />
    </form>
  );
}
