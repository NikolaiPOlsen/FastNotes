import { Redirect } from "expo-router";
const app = () => {
  return (
    <Redirect href="/(auth)/start" />
  );
}

export default app;