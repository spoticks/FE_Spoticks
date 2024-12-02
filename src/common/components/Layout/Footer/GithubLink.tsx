import GithubLogo from "@/assets/github-mark.svg?react";
import { PiGithubLogo } from "react-icons/pi";

export default function GithubLink({
  content,
}: {
  content?: { name: string; url: string; role: string };
}) {
  function openGithubLink(url: string) {
    window.open(url, "_blank");
  }
  return (
    <button
      className="mb-2 flex items-center gap-1 text-[16px] font-semibold transition-opacity hover:opacity-35"
      onClick={
        content
          ? () => {
              openGithubLink(content.url);
            }
          : () => openGithubLink("https://github.com/orgs/spoticks/repositories")
      }
    >
      {content ? <PiGithubLogo className="size-5" /> : <GithubLogo className="size-5" />}
      {content ? `${content.role} - ${content.name}` : "Spoticks on Github"}
    </button>
  );
}
