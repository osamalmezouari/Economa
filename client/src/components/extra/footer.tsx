import { useState, FormEvent } from 'react';
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaAmazonPay,
} from 'react-icons/fa';
import Logo from '../icons/logo';

const Footer = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [email, setEmail] = useState('');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setOpenSnackbar(true);
      setEmail('');
    }
  };

  return (
    <div className="bg-white text-secondary-main py-12 px-4 border-t-2 mt-[40px]">
      <Container maxWidth="lg">
        {/* Top section with logo and newsletter */}
        <Grid container spacing={4} className="mb-8">
          <Grid item xs={12} md={5} className="flex flex-col">
            <Box className="mb-4">
              <Logo />
            </Box>
            <Typography variant="body2" className="mb-4 max-w-md">
              Your one-stop destination for quality products at competitive
              prices. Shop with confidence and enjoy a seamless shopping
              experience.
            </Typography>
            <Box className="flex space-x-2">
              <IconButton
                aria-label="Facebook"
                className="bg-gray-100 hover:bg-primary-main hover:text-white transition-all"
              >
                <FaFacebook size={20} />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                className="bg-gray-100 hover:bg-primary-main hover:text-white transition-all"
              >
                <FaTwitter size={20} />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                className="bg-gray-100 hover:bg-primary-main hover:text-white transition-all"
              >
                <FaInstagram size={20} />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                className="bg-gray-100 hover:bg-primary-main hover:text-white transition-all"
              >
                <FaLinkedin size={20} />
              </IconButton>
              <IconButton
                aria-label="YouTube"
                className="bg-gray-100 hover:bg-primary-main hover:text-white transition-all"
              >
                <FaYoutube size={20} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box className="bg-gray-50 p-6 rounded-lg">
              <Typography variant="h6" className="font-semibold mb-3">
                Subscribe to our Newsletter
              </Typography>
              <Typography variant="body2" className="mb-4">
                Stay updated with our latest offers, product launches, and
                exclusive deals!
              </Typography>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <TextField
                  fullWidth
                  placeholder="Your email address"
                  variant="outlined"
                  size="small"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="whitespace-nowrap "
                >
                  Subscribe
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>

        <Divider className="my-8" />

        {/* Main links section */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography
                variant="h6"
                className="font-semibold mb-6"
                sx={{ marginBottom: '10px' }}
              >
                Shop Categories
              </Typography>
              <ul>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Electronics
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Fashion
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Home & Kitchen
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Beauty & Personal Care
                </li>
              </ul>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography
                variant="h6"
                className="font-semibold mb-6"
                sx={{ marginBottom: '10px' }}
              >
                Customer Service
              </Typography>
              <ul>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  My Account
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Track Order
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Returns & Refunds
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Help Center
                </li>
              </ul>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography
                variant="h6"
                className="font-semibold mb-6"
                sx={{ marginBottom: '10px' }}
              >
                About Us
              </Typography>
              <ul>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Our Story
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Careers
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Press & Media
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Contact Us
                </li>
              </ul>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Typography
                variant="h6"
                className="font-semibold mb-6"
                sx={{ marginBottom: '10px' }}
              >
                Policies
              </Typography>
              <ul>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Privacy Policy
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Terms of Service
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Shipping Policy
                </li>
                <li className="mb-3 cursor-pointer hover:text-primary-main">
                  Return Policy
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>

        <Divider className="my-8" />

        {/* Payment methods and copyright */}
        <Grid container spacing={2} className="mt-4">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" className="text-gray-500 mb-2">
              © {new Date().getFullYear()} Economa. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="flex flex-wrap gap-3 justify-start md:justify-end">
              <Typography
                variant="body2"
                className="text-gray-500 mr-2 self-center"
              >
                Payment Methods:
              </Typography>
              <IconButton size="small" className="p-1">
                <FaCreditCard size={20} />
              </IconButton>
              <IconButton size="small" className="p-1">
                <FaPaypal size={20} />
              </IconButton>
              <IconButton size="small" className="p-1">
                <FaApplePay size={20} />
              </IconButton>
              <IconButton size="small" className="p-1">
                <FaGooglePay size={20} />
              </IconButton>
              <IconButton size="small" className="p-1">
                <FaAmazonPay size={20} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            Thank you for subscribing to our newsletter!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Footer;
