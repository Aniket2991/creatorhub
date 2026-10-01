import type { Metadata } from "next";
import { BrandProfile } from "@/components/brand-profile";
import { ProjectWorkspace } from "@/components/project-workspace";
import { CampaignStudio } from "@/components/campaign-studio";
import { PageShell } from "@/components/ui";

export const metadata: Metadata = {
  title: "Creator Studio",
  description: "Build campaigns, save your brand context and organize creator projects with CreatorHub."
};

export default function StudioPage() {
  return (
    <PageShell>
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">CREATORHUB STUDIO</span>
          <h1>Your AI content workspace.</h1>
          <p>Set your brand once, organize projects and turn a single brief into a complete campaign.</p>
        </div>
        <BrandProfile />
        <ProjectWorkspace />
      </div>
      <CampaignStudio />
    </PageShell>
  );
}
