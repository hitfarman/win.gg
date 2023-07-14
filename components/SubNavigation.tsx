import React from "react";
import { useRouter } from "next/router";
import { ISubNavItem } from "@/interfaces/navigation";

export const subNavItems: ISubNavItem[] = [
  { label: "CS:GO", category: "csgo" },
  { label: "Dota 2", category: "dota2" },
  { label: "LoL", category: "lol" },
  { label: "Valorant", category: "valorant" },
  { label: "Pokémon", category: "pokemon" },
  { label: "GTA", category: "gta" },
  { label: "Twitch", category: "twitch" },
  { label: "Reviews", category: "reviews" }
];

const SubNavigation = () => {
  const router = useRouter();
  const filterParam = router.query.filter;
  const handleClick = (category: string) => {
    router.push(
      filterParam
        ? `${router.asPath.replace(/filter=.*/, `filter=${category}`)}`
        : `${router.asPath}?filter=${category}`,
      undefined,
      {
        shallow: true
      }
    );
  };
  return (
    <nav className="mb-10 flex flex-wrap items-center gap-4">
      <button
        onClick={() =>
          router.push(
            `${router.asPath.replace(/\?filter=.*/, "/")}`,
            undefined,
            {
              shallow: true
            }
          )
        }
        className={`win-secondary-button ${
          filterParam ? "" : "bg-win-primary"
        }`}
      >
        All
      </button>
      {subNavItems.map((item) => (
        <button
          key={`${item.label}-sub-nav-item`}
          onClick={() => handleClick(item.category)}
          className={`win-secondary-button ${
            router.asPath.includes(`filter=${item.category}`)
              ? "bg-win-primary"
              : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default SubNavigation;
