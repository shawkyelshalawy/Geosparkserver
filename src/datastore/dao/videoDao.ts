import { Video } from '../../shared/types';

export interface VideoDao {
  AddVideo(video: Video): Promise<void>;
  getVideoById(id: string): Promise<Video | undefined>;
  getChapterVideos(chapterId: string): Promise<Video[]>;
  DeleteVideo(id: string): Promise<void>;
}
