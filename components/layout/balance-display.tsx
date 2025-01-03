"use client";

interface BalanceDisplayProps {
  amount: number;
  label: string;
}

export function BalanceDisplay({ amount, label }: BalanceDisplayProps) {
  return (
    <div className="text-center space-y-2">
      <div className="text-4xl font-mono">${amount}</div>
      <div className="text-sm font-mono text-white/60">{label}</div>
    </div>
  );