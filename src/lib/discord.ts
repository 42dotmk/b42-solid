import { createSignal, onMount } from "solid-js";

const INVITE_URL = "https://discord.com/api/v10/invites/424xxTZVYX?with_counts=true";
const FETCH_TIMEOUT_MS = 5000;

export type DiscordCounts = {
  online: number | null;
  members: number | null;
};

export async function getDiscordCounts(): Promise<DiscordCounts> {
  "use server";
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(INVITE_URL, { signal: controller.signal }).finally(() => clearTimeout(timer));

    if (!res.ok) return { online: null, members: null };

    const data = await res.json();
    return {
      online: data.approximate_presence_count ?? null,
      members: data.approximate_member_count ?? null,
    };
  } catch {
    return { online: null, members: null };
  }
}

/** Reactive Discord counts — call inside a component. */
export function useDiscordCounts() {
  const [online, setOnline] = createSignal<number | null>(null);
  const [members, setMembers] = createSignal<number | null>(null);

  onMount(async () => {
    const counts = await getDiscordCounts();
    if (counts.online !== null) setOnline(counts.online);
    if (counts.members !== null) setMembers(counts.members);
  });

  return { online, members };
}
