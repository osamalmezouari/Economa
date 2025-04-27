export default function ShoopingCart({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 32 32"
      viewBox="0 0 32 32"
      id="shopping-bag"
      {...props}
    >
      <g id="Layer_1">
        <path
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M25.8716,28.9377H8.0341c-1.0475,0-1.9292-0.7839-2.0519-1.8242L4.3781,13.7176
              c-0.1448-1.2284,0.8149-2.308,2.0519-2.308h21.0458c1.237,0,2.1967,1.0796,2.0519,2.308l-1.6042,13.3959
              C27.8008,28.1538,26.9191,28.9377,25.8716,28.9377z"
        ></path>
        <path
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
          d="M11.3279,15.4096v-6.515c0-3.1066,2.5184-5.625,5.625-5.625h0c3.1066,0,5.625,2.5184,5.625,5.625v6.515"
        ></path>
      </g>
    </svg>
  );
}
