import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const {asPath,route,pathname } = router
  const { slug } = router.query;

  if(asPath === "/"){
    return (
       <Provider>
         <Component {...pageProps} />
       </Provider>
    )
 } else if (
   asPath === "/instructor" ||
   asPath === "/instructor/personal-details" ||
   asPath === "/instructor/course/create" ||
   asPath === "/instructor/revenue" ||
   asPath === `/instructor/course/view/${slug}` ||
   asPath === `/instructor/course/edit/${slug}` ||
   asPath === "/admin" || 
   asPath === "/admin/users" || 
   asPath === "/admin/applicants" || 
   asPath === "/admin/cover" || 
   asPath === "/courses" || 
   asPath === "/about" || 
   asPath === "/admin/category" || 
   asPath === "/admin/category/create" ||
   asPath === `/admin/category/edit/${slug}` ||
   asPath === "/admin/subcategory/create" ||
   asPath === `admin/subcategory/edit/${slug}` ||
   asPath === "/user" 
  ) {
    return(
      <Provider>
      <ToastContainer position="top-center" />
      <TopNav />
        <Component {...pageProps} />
      {/* <Footer /> */}
     </Provider>
    )
 } else {
   return (
    <Provider>
    <ToastContainer position="top-center" />
    <TopNav />
      <Component {...pageProps} />
    <Footer />
   </Provider>
   )
 }

  // return (
  //   <Provider>
  //     <ToastContainer position="top-center" />
  //     {/* <TopNav /> */}
  //       <Component {...pageProps} />
  //     {/* <Footer /> */}
  //   </Provider>
  // );
}

export default MyApp;