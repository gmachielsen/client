import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import LessonCard from "../../components/cards/LessonCard";

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});
  // context
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && course) checkEnrollment();
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log("CHECK ENROLLMENT", data);
    setEnrolled(data);
  };

  const router = useRouter();
  const { slug } = router.query;

  const handlePaidEnrollment = async () => {
    // console.log("handle paid enrollment");
    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Enrollment failed, try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async (e) => {
    // console.log("handle free enrollment");
    e.preventDefault();
    try {
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Enrollment failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SingleCourseJumbotron
              course={course}
              showModal={showModal}
              setShowModal={setShowModal}
              preview={preview}
              setPreview={setPreview}
              user={user}
              loading={loading}
              handlePaidEnrollment={handlePaidEnrollment}
              handleFreeEnrollment={handleFreeEnrollment}
              enrolled={enrolled}
              setEnrolled={setEnrolled}
            />
          </div>
        </div>

      </div>


      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />

      {/* {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )} */}
            <div className="container" style={{ justifyContent: 'center' }}>
              <div className="row" style={{ justifyContent: 'center', textAlign: 'center'}}>
                  <h1 style={{ marginTop: '100px', marginBottom: '100px'}}>Course overview</h1>
              

                {course.lessons.map((lesson) => (
                  <div key={lesson._id} className="col-sm-12 col-md-12 col-lg-6" style={{ textAlign: 'center ', float: 'none', margin: 'auto', display: 'contents'}}>
                    <LessonCard 
                     lesson={lesson} 
                     setPreview={setPreview}
                     showModal={showModal}
                     setShowModal={setShowModal}
                    />
                  </div>
                  )
                )}
              </div>
            </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;