export function CustomYAxisTick({ x, y, payload, prefix }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" className="fill-gray-500  text-[12px]">
        {prefix && prefix}
        {payload.value.toLocaleString()}
      </text>
    </g>
  );
}
