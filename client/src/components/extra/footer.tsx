import  { useState } from "react";
import { Container, Grid, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="bg-white text-secondary-main py-16 px-4 border-2 ">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <div>
                            <Typography variant="h6" className="font-semibold mb-6" sx={{ marginBottom: "10px" }}>Product Features</Typography>
                            <ul>
                                <li className="mb-3 cursor-pointer hover:text-primary-main ">Solutions</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Integrations</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Pricing Plans</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Product Updates</li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <div>
                            <Typography variant="h6" className="font-semibold mb-6" sx={{ marginBottom: "10px" }}>Company Information</Typography>
                            <ul>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">About Us</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Careers</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Press Kit</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Contact Us</li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <div>
                            <Typography variant="h6" className="font-semibold mb-6" sx={{ marginBottom: "10px" }}>Customer Support</Typography>
                            <ul>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Help Center</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Documentation</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Community Forums</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Status Page</li>
                            </ul>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <div>
                            <Typography variant="h6" className="font-semibold mb-6" sx={{ marginBottom: "10px" }}>Legal & Policies</Typography>
                            <ul>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Privacy Policy</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Terms of Service</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Cookie Policy</li>
                                <li className="mb-3 cursor-pointer hover:text-primary-main">Security</li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>



                <div className="mt-8 w-max ml-auto ">
                    <div className="mb-4">
                        <IconButton aria-label="Facebook" className="text-white mx-2 hover:text-primary-main">
                            <FaFacebook size={24} />
                        </IconButton>
                        <IconButton aria-label="Twitter" className="text-white mx-2 hover:text-primary-main">
                            <FaTwitter size={24} />
                        </IconButton>
                        <IconButton aria-label="Instagram" className="text-white mx-2 hover:text-primary-main">
                            <FaInstagram size={24} />
                        </IconButton>
                        <IconButton aria-label="LinkedIn" className="text-white mx-2 hover:text-primary-main">
                            <FaLinkedin size={24} />
                        </IconButton>
                        <IconButton aria-label="YouTube" className="text-white mx-2 hover:text-primary-main">
                            <FaYoutube size={24} />
                        </IconButton>
                    </div>
                    <Typography variant="body2" className="text-gray-400">
                        © {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </Typography>
                </div>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                        Thank you for subscribing to our newsletter!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
};

export default Footer;
