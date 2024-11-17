import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard() {
    return (
        <Card sx={{ maxWidth: 300 , padding : '5px' }}>
            <CardMedia
                sx={{ height: 280}}
                className='bg-cover bg-center'
                image="https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/products/bakery/product3.jpg"
                title="green iguana"
                
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
