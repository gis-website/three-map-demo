import { create3DCylinder } from '../animations/cylinderDiffusionRipple'

/**
 * @description: 加载波动画 load ripple animation
 * @param {*} void
 * @return {*}
 */
export const loadCylinderDiffusionRipple = ():void => {
  create3DCylinder(5, './images/gradual_blue_01.png', null)
}
