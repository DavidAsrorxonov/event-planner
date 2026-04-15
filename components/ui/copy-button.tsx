"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./button";

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleCopy}
      className="shrink-0"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};
