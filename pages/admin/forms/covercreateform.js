import { Button, Avatar, Badge, Progress } from "antd";


const CoverCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  preview,
  // uploadVideoText,
  uploadImageText,
  // uploading,
  // handleVideo,
  // handleVideoRemove,
  handleImage,
  // progress,
  handleImageRemove = (f) => f,
}) => {
 
  return (
   <>
    {values && (
     <form onSubmit={handleSubmit}>
     <div className="form-group">
       <input
         type="text"
         name="title"
         className="form-control"
         placeholder="title"
         value={values.title}
         onChange={handleChange}
       />
     </div>
      <br/>
     <div className="form-group">
       <textarea
         name="text"
         cols="7"
         rows="7"
         value={values.text}
         className="form-control"
         onChange={handleChange}
       ></textarea>
     </div>
     {/* <div className="d-flex justify-content-center">
        <label className="btn btn-dark btn-block text-left mt-3">
            {uploadVideoText}
            <input onChange={handleVideo} type="file" acccept="video/*" hidden />
        </label>
        {!uploading && values.video.Location && (
            <Tooltip title="Remove">
                <span onClick={handleVideoRemove} className="pt-1 pl-3">
                    <CloseCircleFilled className="text-danger d-flex justify-content-center pt-4 pointer" />
                </span>
            </Tooltip>
        )}
    </div>
    {progress > 0 && (
                    <Progress 
                        className="d-flex justify-content-center pt-2"
                        percent={progress}
                        steps={10}
                    />
                )} */}
     <div className="form-row">
       <div className="col">
         <div className="form-group">
           <label className="btn btn-outline-secondary btn-block text-left">
             {uploadImageText}
             <input
               type="file"
               name="image"
               onChange={handleImage}
               accept="image/*"
               hidden
             />
           </label>
         </div>
       </div>

       {preview && (
         <Badge count="X" onClick={handleImageRemove} className="pointer">
           <Avatar width={200} src={preview} />
         </Badge>
       )}
       {values.image && (<Avatar width={200} src={values.image.Location} />)}
     </div>

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