import express from "express";
import routes from "../routes";
import {
  videoDetail,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
  getDeleteVideo,
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, getDeleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
