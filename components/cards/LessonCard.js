import { Card, Avatar } from "antd";
// const {Item} = List;
const LessonCard = ({ lesson, setPreview, showModal, setShowModal, }) => {
    return (
        <div className="lesson" style={{ textAlign: 'center', padding: 'inherit' }}>
                       

                    <Card bordered={false} style={{ position: 'relative', width: 500, height: 500 }} cover={<img style={{ width: 500, height: 500, objectFit: 'cover', textAlign: 'center'}} alt="example" src={lesson.lessonimage && lesson.lessonimage !== null && (lesson.lessonimage.Location)} />}>
                        {/* <div>
                        <img alt="example" src={lesson.lessonimage && lesson.lessonimage !== null && (lesson.lessonimage.Location)} />
                        </div> */}
                        {/* <h1 style={{ position: 'absolute', textAlign: 'center', top: '50%', left: '50%' }}>{lesson.title}</h1> */}
                        <h1 style={{ textAlign: 'center' }}>{lesson.title}</h1>

                        <p style={{ textAlign: 'center' }}>{lesson.video && lesson.video !== null && lesson.free_preview && (
                                <span className="text-primary pointer" onClick={() => {
                                    setPreview(lesson.video.Location);
                                    setShowModal(!showModal);
                                }}>Preview</span>
                            )}
                        </p>
                    </Card>
                        {/* <Card 
                            dataSource={lesson}
                        
                            renderItem={(item, index) => (
                                <Item>
                                    <Item.Meta avatar={<Avatar>{index + 1}</Avatar>} title={item.title}/>
                                        {item.video && item.video !== null && item.free_preview && (
                                            <span className="text-primary pointer" onClick={() => {
                                                setPreview(item.video.Location);
                                                setShowModal(!showModal);
                                            }}>Preview</span>
                                        )}
                                  
                                </Item>
                            )}
                        /> */}
                    <br/>
        </div>
    );
};

export default LessonCard;