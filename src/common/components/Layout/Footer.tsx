import GithubLogo from "@/assets/github-mark.svg?react";

export default function Footer() {
  function openGithubLink(url: string) {
    window.open(url, "_blank");
  }
  return (
    <footer className="flex h-[160px] w-full justify-center bg-slate-400">
      <div className="flex w-content-width items-center justify-center">
        <button
          className="flex items-center gap-1 text-[16px] font-semibold transition-colors duration-200 hover:text-text-tertiary"
          onClick={() => {
            openGithubLink("https://github.com/orgs/spoticks/repositories");
          }}
        >
          <GithubLogo className="size-5" />
          Spoticks on Github
        </button>
      </div>
    </footer>
  );
}
