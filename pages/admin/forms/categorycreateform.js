import { Button, Avatar, Badge, Progress } from "antd";


const CoverCreateForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {
 
  return (
   <>
    {values && (
     <form onSubmit={handleSubmit}>
     <div className="form-group">
       <input
         type="text"
         name="name"
         className="form-control"
         placeholder="name"
         value={values.name}
         onChange={handleChange}
       />
     </div>
      <br/>

    

     <div className="row">
       <div className="col">
         <Button
           onClick={handleSubmit}
           disabled={values.loading || values.uploading}
           className="btn btn-primary"
           loading={values.loading}
           type="primary"
           size="large"
           shape="round"
         >
           {values.loading ? "Saving..." : "Save & Continue"}
         </Button>
       </div>
     </div>
   </form>
    )}
   </>
  );
};

export default CoverCreateForm;