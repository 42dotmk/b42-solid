import { Icon } from "@iconify-icon/solid";

interface ShareButtonProps {
  url: string;
}

export default function ShareButton(props: ShareButtonProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.url);
  };

  return (
    <button
      onClick={handleCopy}
      class="p-2 rounded-lg bg-dark-700 text-text-secondary hover:text-primary hover:bg-dark-600 transition-colors"
      aria-label="Copy link"
    >
      <Icon icon="lucide:link" class="w-5 h-5" />
    </button>
  );
}
