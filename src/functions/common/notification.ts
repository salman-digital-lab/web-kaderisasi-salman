import { notifications } from "@mantine/notifications";
import { NOTIFICATION_TEXT_RENDER } from "./render";

export default function showNotif(message: string, isError?: boolean) {
  if (isError) {
    notifications.show({
      color: "red",
      title: "Gagal",
      message: NOTIFICATION_TEXT_RENDER[message] || message,
    });
  } else {
    notifications.show({
      title: "Sukses",
      message: NOTIFICATION_TEXT_RENDER[message] || message,
    });
  }
}
