import { MetadataRoute } from "next";

import { buildSiteUrl } from "@/lib/schema";
import { getAllProgrammeSlugs } from "@/lib/server/programmes";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/apply", changeFrequency: "weekly", priority: 0.9 },
  { path: "/careers", changeFrequency: "daily", priority: 0.8 },
  { path: "/careers/jobs", changeFrequency: "daily", priority: 0.7 },
  { path: "/careers/internships", changeFrequency: "daily", priority: 0.7 },
  { path: "/community", changeFrequency: "weekly", priority: 0.7 },
  { path: "/faculties", changeFrequency: "monthly", priority: 0.7 },
  { path: "/student-life", changeFrequency: "weekly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: buildSiteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const programmeEntries: MetadataRoute.Sitemap = getAllProgrammeSlugs().map(
    (slug) => ({
      url: buildSiteUrl(`/${slug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
  );

  return [...staticEntries, ...programmeEntries];
}
