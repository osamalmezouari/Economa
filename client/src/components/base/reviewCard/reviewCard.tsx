import { Avatar, Grid, Rating } from '@mui/material';

const ReviewCard = () => {
  return (
    <Grid
      container
      gap={2}
      className=" review-card flex flex-col p-4 border-b-2  my-2 border-solid border-gray-200 max-w-[1150px] mx-auto"
    >
      <Grid item lg={1} className="flex items-center justify-center">
        <Avatar
          src="/assets/images/"
          alt="A"
          sx={{
            width: 70, // Set width
            height: 70, // Set height
          }}
        />
      </Grid>
      <Grid item lg={10}>
        <Grid item lg={12}>
          <p className="mb-2">Mariya Lykra</p>
        </Grid>
        <Grid item lg={12}>
          <Rating size="small" value={4} />
        </Grid>
        <Grid item lg={12}>
          <p className="text-secondary-main text-[14px] w-11/12">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen.
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ReviewCard;
