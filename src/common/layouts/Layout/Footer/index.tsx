import { teamMembers } from "@/common/constants";
import Copyright from "@/common/layouts/Layout/Footer/Copyright";
import GithubLink from "@/common/layouts/Layout/Footer/GithubLink";

export default function Footer() {
  return (
    <footer className="flex w-full justify-center">
      <div className="flex w-content-width flex-col items-center justify-center p-8">
        <div className="mb-4 flex gap-2">
          {teamMembers.map((member) => (
            <GithubLink content={member} key={member.name} />
          ))}
        </div>
        <GithubLink />
        <Copyright />
      </div>
    </footer>
  );
}
