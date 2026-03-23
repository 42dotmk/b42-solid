import { Title } from "@solidjs/meta";
import NotFoundPage from "~/components/common/NotFoundPage";
import { siteMeta } from "~/data/site";

export default function NotFound() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("404")}</Title>
      <NotFoundPage />
    </>
  );
}
