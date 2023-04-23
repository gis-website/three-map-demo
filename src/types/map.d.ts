/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-23 08:32:28
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 09:17:38
 * @FilePath: \three-map-demo\src\types\map.d.ts
 * @Description: geojson struct
 */

interface Parent {
    adcode: number
}

interface Properties {
    adcode: number,
    name: string,
    center: Array,
    centroid: Array<number>,
    childrenNum: number,
    level: string,
    parent: Parent,
    subFeatureIndex: number,
    acroutes: Array<number>
}

interface Geomtery {
    type: string,
    coordinates: Array<Array<Array<Array<number>>>>
}

export interface Features {
    type: string,
    properties: Properties,
    geometry: Geomtery
}

export interface MapGeo {
    type: string,
    features: Array<Features>
}
