import React, { useState } from "react";
import { Button } from 'antd';
import Link from "next/link"

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {

    }
    return (
        <div className="container-fluid">
            <div className="row" style={{ height: '80vh' }}>
                {/* <div className="col-12">
                <img src={require('../../public/coverphoto.jpg')}  style={{ filter: 'grayscale(55%)', objectFit: 'cover', minWidth: '100%', maxHeight: '50vh', display: 'block', zIndex: 0 }} />

                </div> */}
                <div className="col-12" style={{ fontFamily: 'serif' }}>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <h1 className="text-center" style={{ fontWeight: 'bold' }} >Subribe for newsletter</h1>
                    <p className="text-center" style={{ fontSize: '18px'}}>Get news about new coursereleases and more!</p>
                    <form handleSubmit={handleSubmit} className="col-8 offset-2 text-center" >
                        <input className="form-control" />
                        <br/>
                        <Button href="/user/newsletter-unsubscribe" handleSubmit={handleSubmit}>Subscribe</Button>
                    </form>
                    <Link className="text-center" href="/user/newsletter-unsubscribe">unscubsribe for newsletter</Link>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Newsletter;