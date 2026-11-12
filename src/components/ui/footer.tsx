import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 py-8 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Esdras Shaa Prombo</span>
        <span>
          Template by
          <Link href="https://github.com/Logging-Studio" target="_blank" className="ml-1 text-primary">
            Logging Studio
          </Link>{" "}
          • Distributed by
          <Link href="https://themewagon.com" target="_blank" className="ml-1 text-primary">
            ThemeWagon
          </Link>
        </span>
      </div>
    </footer>
  );
}
