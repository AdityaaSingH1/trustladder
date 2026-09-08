import { useEffect, useState } from 'react';
import type { ScoreCategory } from '@/types';
import { categoryForScore } from '@/lib/data';

interface TrustScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  showLabel?: boolean;
  compact?: boolean;
}

function arcColor(score: number): string {
  if (score <= 40) return '#F59E0B';
  if (score <= 60) return '#F59E0B';
  if (score <= 80) return '#3B82F6';
  return '#10B981';
}

export function TrustScoreRing({
  score,
  size = 200,
  strokeWidth = 10,
  animate = true,
  showLabel = true,
  compact = false,
}: TrustScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(displayScore / 100, 1);
  const dashOffset = circumference * (1 - progress * 0.75);
  const color = arcColor(score);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }
    let raf: number;
    const start = performance.now();
    const duration = 1400;
    const from = 0;
    const to = score;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round((from + (to - from) * eased) * 100) / 100);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, animate]);

  const category: ScoreCategory = categoryForScore(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition: animate ? 'stroke-dashoffset 0.1s linear' : undefined,
            filter: `drop-shadow(0 0 8px ${color}66)`,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold tabular-nums text-white" style={{ fontSize: size * 0.18 }}>
            {displayScore.toFixed(2)}
          </span>
          {!compact && (
            <>
              <span className="mono-label-dim mt-0.5">/ 100</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-small-caps" style={{ color }}>
                {category}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface MiniScoreBarProps {
  label: string;
  score: number;
  delay?: number;
}

export function MiniScoreBar({ label, score, delay = 0 }: MiniScoreBarProps) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(score), delay);
    return () => clearTimeout(t);
  }, [score, delay]);
  const color = score >= 81 ? 'bg-emerald' : score >= 61 ? 'bg-blue' : 'bg-amber';
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="font-mono tabular-nums text-gray-200">{score}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}
