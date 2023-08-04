import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { UserSettings } from "../api/settings/route";

const getSettings = async (): Promise<UserSettings> => {
  const res = await fetch("/api/settings");
  const json = await res.json();
  return json;
};

const useSettings = (initialData) => {
  const { data } = useQuery<UserSettings>({
    queryKey: ["settings"],
    queryFn: getSettings,
    initialData: initialData,
  });
  const { mutate: updateSettings, isLoading } = useMutation({
    mutationKey: ["settings"],
    mutationFn: (newSettings: any) => {
      return fetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify(newSettings),
      });
    },
  });
  const form = useForm({
    defaultValues: initialData,
  });

  const submitForm = form.handleSubmit((data) => {
    updateSettings(data);
  });

  return {
    settings: data,
    updateSettings,
    settingsForm: form,
    submitForm,
    isLoading,
  };
};

export default useSettings;
