import { Avatar, Grid, Rating } from '@mui/material';
import { Review } from '../../types/review';

const ReviewCard = ({ user, rating, reviewText, createdAt }: Review) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('En-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Grid
      container
      gap={2}
      className="review-card flex rounded  p-4 border-[1px] my-2 border-solid border-gray-200 max-w-[1150px] mx-auto"
    >
      <Grid item lg={1} className="flex items-center justify-center">
        <Avatar
          src={user.name || ''}
          alt={user.name || user.name.trim().charAt(0).toUpperCase()}
          sx={{
            width: 70,
            height: 70,
          }}
        />
      </Grid>
      <Grid item lg={10}>
        <Grid item lg={12}>
          <p>{user.name || 'Anonymous'}</p>
        </Grid>
        <Grid item lg={12} className="flex items-center gap-2">
          <Rating size="small" value={rating || 0} disabled />
          <p className="text-secondary-light py-2 text-[12px]">
            {createdAt ? formatDateTime(createdAt) : ''}
          </p>
        </Grid>
        <Grid item lg={12}>
          <p className="text-secondary-main text-[14px] w-11/12">
            {reviewText || 'No review text provided.'}
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReviewCard;
