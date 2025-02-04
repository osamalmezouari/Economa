import { Box } from '@mui/material';
import { useRouter } from '@tanstack/react-router';

const Logo = () => {
  const router = useRouter();
  return (
    <>
      <Box
        component={'div'}
        className="cursor-pointer bg-cover bg-center w-60 h-10"
        style={{ backgroundImage: 'url(/assets/images/testlogo2.png)' }}
        onClick={() => router.navigate({ to: '/Economa' })}
      />
    </>
  );
};
export default Logo;
