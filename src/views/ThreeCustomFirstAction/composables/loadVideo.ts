import { loadBaseVideo } from '../animations/video'

/**
 * @description: 加载视频
 * @param {string} type 加载视频的分类(按业务分)
 * @return {*}
 */
export const loadVideo = (type:string):void => {
  switch (type) {
    case 'base':
      loadBaseVideo()
      break

    default:
      break
  }
}
