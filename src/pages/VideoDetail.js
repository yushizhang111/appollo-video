import React from "react";
import { video } from "../api";
import { profile } from "../api";
import { Card , Row, Col,Collapse} from "antd";
import SideVideoList from "../component/Video/SideVideoList";
import VideoContent from "../component/Video/VideoContent";
import CommentList from "../component/Comment/CommentList";

const {Panel} = Collapse
export default class VideoDetail extends React.Component {
    state = {
        videoDetail: '',
        comments: [],
        recommended: [],
        currentUser:''
    }

    componentDidMount() {
        const path = window.location.pathname.split('/');
        const length = path.length
        const videoId = path[length - 1];
        
        profile.getWatchedVideoDetails(videoId).then(
            response => {
                this.setState({
                    videoDetail:response
                })
            }
        )
        profile.getProfile().then(
            response => {
                this.setState({
                    currentUser:response
                })
            }
        )
        video.getVideoComments(videoId).then(
            response => {
                this.setState({
                    comments:response
                })
            }
        )
        video.getVideosList().then(
            response => {
                this.setState({
                    recommended: response
                })
            }
        )
    }
	

	render() {
        const { videoDetail, comments, recommended, currentUser } = this.state
        console.log(recommended)

		return (
			<div>
				<Row gutter={24}>
                    <Col xl={16} lg={16} md={24} sm={24} xs={24} >
                        <Card>
                            <VideoContent content={videoDetail} />
                        </Card>
                        <Collapse style={{"marginLeft":"20px", "marginRight":"20px"}}>
                            <Panel header="Comments" >
                                <CommentList content={comments} user={currentUser} />
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col xl={8} lg={8} md={24} sm={24} xs={24} >
                        <Card title="Recommeded">
                            <SideVideoList videoData={recommended} />
                        </Card>
                    </Col>
                </Row>
			</div>
		);
	}
}
