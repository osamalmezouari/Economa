export default function Favorite({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="i-heart"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="#000000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      {...props}
    >
      <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z"></path>
    </svg>
  );
}
