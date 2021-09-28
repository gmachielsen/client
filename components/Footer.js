import React, { useState } from 'react'
import { Content } from "antd/lib/layout/layout";
import Link from "next/link";
import { Button } from "antd";
// import { SocialIcon } from 'react-social-icons';
import { FacebookOutlined } from "@ant-design/icons";

const Footer = () => {
    const [visible, setVisible] = useState(false);
    
    return (
        <footer style={{ backgroundColor: '#000', fontFamily: 'serif'}}>
                <section className="newsletter">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="content text-center" style={{ color: 'white', backgroundColor: 'black'}}>
                                    <br/>
                                    <h2 style={{ color: 'white' }}>Blijf op de hoogte</h2>
                                    <p>Schrijf je in voor onze nieuwsbrief en volg ons op social media</p>
                                    {/* <fab icon={['fab', 'google']} /> */}
                                    <div className="subscribe input-group mb-3" style={{ justifyContent: 'center'}}>
                                        {/* style={{ justify-content: 'center' }} */}
                                            <div>
                                                <Button href="/user/newsletter">Inschrijven</Button>
                                            </div>        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="row text-center d-flex justify-content-center pt-5 mb-3" style={{ margin: 'auto', display: 'flex'}}>
          
                            <div className="col-lg-2 col-xl-1 mb-3">
                                <h6  className="text-uppercase font-weight">
                                <Link style={{ color: 'red' }} href="/about"><p style={{ color: "white" }}>About us</p></Link>
                                </h6>
                            </div>

                            <div className="col-lg-2 col-xl-1 mb-3">
                                <h6 className="text-uppercase font-weight">
                                <Link href="/courses"><p style={{ color: "white" }}>Courses</p></Link>
                                </h6>
                            </div>

                            <div className="col-lg-2 col-xl-1 mb-3">
                                <h6 className="text-uppercase font-weight">
                                <Link href="/"><p style={{ color: "white" }}>Instructors</p></Link>
                                </h6>
                            </div>
{/* 
                            <div className="col-lg-2 col-xl-1 mb-3">
                                <h6 className="text-uppercase font-weight">
                                <Link href="/"><p style={{ color: "white" }}>Contact</p></Link>
                                </h6>
                            </div>  */}
                    
             
 
                    </div>

                        <hr className="rgba-white-light" style={{ margin: '0 15%'}}></hr>
                        <hr className="clearfix d-md-none rgba-white-light" style={{ margin: '10% 15% 5%'}}></hr>

                    
                </div>
        </footer>
    )
}

export default Footer;

{/* <div className="row pb-3">

                    <div className="col-md-12 text-center" style={{ color: 'white' }}>

                        <div className="mb-5 social flex-center">

                            <a className="fb-ic">
                                <i icon={ <FacebookOutlined /> } className="fab fa-facebook-f fa-lg white-text mr-4" style={{ color: 'white' }}> </i>
                            </a>
                            <a className="tw-ic">
                                <i className="fab fa-twitter fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="gplus-ic">
                                <i className="fab fa-google-plus-g fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="li-ic">
                                <i className="fab fa-linkedin-in fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="ins-ic">
                                <i className="fab fa-instagram fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="pin-ic">
                                <i className="fab fa-pinterest fa-lg white-text"> </i>
                            </a>

                        </div>

                    </div>

                    </div> */}