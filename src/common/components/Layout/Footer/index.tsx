import Copyright from "@/common/components/Layout/Footer/Copyright";
import ProjectLink from "@/common/components/Layout/Footer/GithubLink";
import { teamMembers } from "@/common/constants";

export default function Footer() {
  return (
    <footer className="flex w-full justify-center">
      <div className="flex w-content-width flex-col items-center justify-center p-8">
        <div className="mb-4 flex gap-2">
          {teamMembers.map((member) => (
            <ProjectLink content={member} />
          ))}
        </div>
        <ProjectLink />
        <Copyright />
      </div>
    </footer>
  );
}
