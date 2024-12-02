import GithubLogo from "@/assets/github-mark.svg?react";
import { PiGithubLogo } from "react-icons/pi";

const teamMembers = [
  {
    role: "FE",
    name: "도현수",
    url: "https://github.com/dohyeons",
  },
  {
    role: "FE",
    name: "김경민",
    url: "https://github.com/devminoh",
  },
  {
    role: "BE",
    name: "김지효",
    url: "https://github.com/zirryo",
  },
];
export default function Footer() {
  function openGithubLink(url: string) {
    window.open(url, "_blank");
  }
  return (
    <footer className="flex h-[160px] w-full justify-center bg-slate-400">
      <div className="flex w-content-width flex-col items-center justify-center">
        <button
          className="flex items-center gap-1 text-[16px] font-semibold transition-opacity hover:opacity-35"
          onClick={() => {
            openGithubLink("https://github.com/orgs/spoticks/repositories");
          }}
        >
          <GithubLogo className="size-5" />
          Spoticks on Github
        </button>
        <div className="flex gap-2">
          {teamMembers.map((member) => (
            <button
              className="flex items-center gap-1 text-[16px] font-semibold transition-opacity hover:opacity-35"
              onClick={() => {
                openGithubLink(member.url);
              }}
            >
              <PiGithubLogo className="size-5" />
              {member.role} - {member.name}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
