import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Footer from "~/components/layout/Footer";
import Navbar from "~/components/layout/Navbar";
import { siteMeta } from "~/data/site";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
      <Title>{siteMeta.defaultTitle}</Title>
      <Meta name="description" content={siteMeta.description} />
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content="Base42" />
      <Meta property="og:url" content={siteMeta.siteUrl} />
      <Meta property="og:title" content={siteMeta.defaultTitle} />
      <Meta property="og:description" content={siteMeta.description} />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={siteMeta.defaultTitle} />
      <Meta name="twitter:description" content={siteMeta.description} />
      <Router
        root={props => (
          <>
            <Navbar />
            <Suspense>{props.children}</Suspense>
            <Footer />
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
