"use client";

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  backLink?: string;
}

export function PageHeader({ title, backLink = '/' }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {backLink && (
        <Link href={backLink}>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      )}
      <h1 className="text-xl font-mono text-orange-500">{title}</h1>
      <div className="w-10" />
    </div>
  );
}