import crypto from 'crypto';
import { db } from '../datastore';
import {
  CreateVideoRequest,
  CreateVideoResponse,
  DeleteVideoRequest,
  DeleteVideoResponse,
  GetVideoRequest,
  GetVideoResponse,
  listVideoRequest,
  listVideoResponse,
} from '../shared/api';
import { ERRORS } from '../shared/errors';
import { Video } from '../shared/types';
import { ExpressHandlerWithParams } from '../types';

export const CreatVideoHandler: ExpressHandlerWithParams<
  { chapterId: string },
  CreateVideoRequest,
  CreateVideoResponse
> = async (req, res) => {
  if (!req.params.chapterId)
    return res.status(400).send({ error: ERRORS.Chapter_ID_MISSING });
  if (!req.body.title || !req.body.url) {
    return res.status(400).send({ error: ERRORS.Fields_ARE_MISSING });
  }
  if (!(await db.getChapterById(req.params.chapterId)))
    return res.status(404).send({ error: ERRORS.Chapter_Not_Found });
  const video: Video = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    chapterId: req.params.chapterId,
  };
  await db.AddVideo(video);
  res.status(200).send(video);
};

export const getVideoByIdHandler: ExpressHandlerWithParams<
  { id: string },
  GetVideoRequest,
  GetVideoResponse
> = async (req, res) => {
  if (!req.params.id)
    return res.status(400).send({ error: ERRORS.Video_ID_MISSING });
  const video = await db.getVideoById(req.params.id);
  if (!video) return res.status(404).send({ error: ERRORS.Video_Not_Found });
  return res.status(200).send(video);
};

export const getVideosForChapter: ExpressHandlerWithParams<
  { chapterId: string },
  listVideoRequest,
  listVideoResponse
> = async (req, res) => {
  if (!req.params.chapterId)
    return res.status(400).send({ error: ERRORS.Chapter_ID_MISSING });
  const videos = await db.getChapterVideos(req.params.chapterId);
  if (!videos) return res.status(404).send({ error: ERRORS.Video_Not_Found });
  return res.status(200).send({
    videos: videos.map((video) => ({
      title: video.title,
      url: video.url,
    })),
  });
};

export const deleteVideoHandler: ExpressHandlerWithParams<
  { id: string },
  DeleteVideoRequest,
  DeleteVideoResponse
> = async (req, res) => {
  if (!req.params.id)
    return res.status(400).send({ error: ERRORS.Video_ID_MISSING });
  const video = await db.getVideoById(req.params.id);
  if (!video) return res.status(404).send({ error: ERRORS.Video_Not_Found });
  await db.DeleteVideo(req.params.id);
  return res.status(200).send({ message: 'Video Deleted' });
};
