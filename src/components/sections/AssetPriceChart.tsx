'use client';

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { PriceHistoryPoint, PricePredictionPoint } from '@/lib/lifestyle-types';

interface AssetPriceChartProps {
  history: PriceHistoryPoint[];
  prediction: PricePredictionPoint[];
  trend: 'appreciating' | 'depreciating' | 'stable';
  currency?: string;
}

function formatK(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(value / 1_000)}K`;
}

// Merge history + prediction into one array for the chart, flagging the split
function buildChartData(
  history: PriceHistoryPoint[],
  prediction: PricePredictionPoint[]
) {
  const hist = history.map((p) => ({
    month: p.month,
    avgPrice: p.avgPrice,
    marketMin: p.marketMin,
    marketMax: p.marketMax,
    predicted: undefined as number | undefined,
    isPrediction: false,
  }));

  // Carry the last historical avg into the prediction seam so the line connects
  const seam = hist[hist.length - 1].avgPrice;

  const pred = prediction.map((p, i) => ({
    month: p.month,
    avgPrice: undefined as number | undefined,
    marketMin: undefined as number | undefined,
    marketMax: undefined as number | undefined,
    predicted: i === 0 ? seam : p.predicted,
    isPrediction: true,
  }));

  // Add the seam point to prediction start
  pred[0].predicted = seam;

  return [...hist, ...pred];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'rgba(17,17,19,0.95)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: '2px',
        padding: '10px 14px',
        fontSize: '0.75rem',
      }}
    >
      <p
        style={{
          color: 'rgba(136,136,150,0.9)',
          marginBottom: '6px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: '0.65rem',
        }}
      >
        {label}
      </p>
      {payload.map((entry) =>
        entry.value != null ? (
          <p key={entry.name} style={{ color: entry.color, margin: '2px 0' }}>
            {entry.name}: <strong>{formatK(entry.value)}</strong>
          </p>
        ) : null
      )}
    </div>
  );
};

export default function AssetPriceChart({
  history,
  prediction,
  trend,
}: AssetPriceChartProps) {
  const data = buildChartData(history, prediction);
  const splitIndex = history.length - 1;

  const trendConfig = {
    appreciating: {
      label: '↑ Likely to Appreciate',
      bg: 'rgba(52,199,89,0.1)',
      border: 'rgba(52,199,89,0.35)',
      color: '#34C759',
    },
    depreciating: {
      label: '↓ May Depreciate',
      bg: 'rgba(255,69,58,0.1)',
      border: 'rgba(255,69,58,0.35)',
      color: '#FF453A',
    },
    stable: {
      label: '→ Price Stable',
      bg: 'rgba(201,168,76,0.08)',
      border: 'rgba(201,168,76,0.3)',
      color: '#C9A84C',
    },
  };

  const tc = trendConfig[trend];

  return (
    <div
      className="rounded-[2px] p-6 flex flex-col gap-5"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p
            className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-1"
            style={{ color: 'var(--color-gold)' }}
          >
            Price Intelligence
          </p>
          <h3
            className="text-lg font-normal text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Market Value History & Forecast
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-gray)' }}>
            24-month history · 6-month AI forecast · market comparables
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-xs font-semibold"
          style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }}
        >
          {tc.label}
        </span>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 flex-wrap">
        <LegendItem color="rgba(201,168,76,0.9)" label="This model avg" type="line" />
        <LegendItem color="rgba(136,136,150,0.4)" label="Market range (min–max)" type="area" />
        <LegendItem color="rgba(52,199,89,0.8)" label="AI price forecast" type="dashed" />
      </div>

      {/* Chart */}
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(42,42,47,0.6)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: 'rgba(136,136,150,0.7)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={5}
            />
            <YAxis
              tickFormatter={formatK}
              tick={{ fill: 'rgba(136,136,150,0.7)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Market range band */}
            <Area
              type="monotone"
              dataKey="marketMax"
              stroke="none"
              fill="rgba(136,136,150,0.12)"
              name="Market High"
              connectNulls
            />
            <Area
              type="monotone"
              dataKey="marketMin"
              stroke="none"
              fill="var(--color-bg)"
              name="Market Low"
              connectNulls
            />

            {/* This model avg */}
            <Line
              type="monotone"
              dataKey="avgPrice"
              stroke="rgba(201,168,76,0.9)"
              strokeWidth={2}
              dot={false}
              name="Model avg"
              connectNulls
            />

            {/* Prediction line */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="rgba(52,199,89,0.8)"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
              name="AI Forecast"
              connectNulls
            />

            {/* Divider between history and prediction */}
            <ReferenceLine
              x={data[splitIndex].month}
              stroke="rgba(42,42,47,0.8)"
              strokeDasharray="3 3"
              label={{
                value: 'Today',
                position: 'top',
                fill: 'rgba(136,136,150,0.7)',
                fontSize: 9,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[0.65rem]" style={{ color: 'var(--color-muted)' }}>
        Market data sourced from auction results, dealer sales, and active listings. AI forecast
        is indicative only and does not constitute financial advice.
      </p>
    </div>
  );
}

function LegendItem({
  color,
  label,
  type,
}: {
  color: string;
  label: string;
  type: 'line' | 'area' | 'dashed';
}) {
  return (
    <div className="flex items-center gap-1.5">
      {type === 'area' ? (
        <span
          className="w-4 h-3 rounded-sm"
          style={{ background: color }}
          aria-hidden="true"
        />
      ) : (
        <span
          className="w-4 h-0"
          style={{
            borderTop: `2px ${type === 'dashed' ? 'dashed' : 'solid'} ${color}`,
            display: 'block',
          }}
          aria-hidden="true"
        />
      )}
      <span className="text-[0.65rem]" style={{ color: 'var(--color-muted)' }}>
        {label}
      </span>
    </div>
  );
}
