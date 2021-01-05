/**
 * 全局配置文件
 */
export default {
  title: '嘉陵江流域',
  systemName: 'Jljlx',
  firstPage: '/map-basicInfo',
  baseUrl: 'http://192.168.0.181:10100/',
  systemUrl: 'drinkwater/',
  mapKey: '9d373acb8e2e26d638cc96333ea5feec',
  menus: [
    {
          "id":"01",
          "pid":"0",
          "name":"dzdtksh",
          "path":"map",
          "mkname":"电子地图可视化",
          "zj":"mapView/index",
          "iconclass":"dianziditu",
          "moudleid":"24fe4acdbe2e4b98b5bebdc545f56598",
          "ischeck":false,
          "operations":[
  
          ],
          "moudles":[
  
          ]
    },
    {
      "id":"04",
      "pid":"0",
      "name":"system",
      "path":"system",
      "mkname":"系统管理",
      "zj":"system/index",
      "iconclass":"zhutijianceyuyujing",
      "moudleid":"f9fc1537737c4326b61b9ab920ad58fe",
      "ischeck":false,
      "operations":[

      ],
      "moudles":[
            {
                "id":"0401",
                "pid":"04",
                "name":"yhgl",
                "path":"yhgl",
                "mkname":"用户管理",
                "zj":"system/yhgl",
                "iconclass":"yonghuguanli",
                "moudleid":"03df6e068f6e4de6846e81028addc5d3",
                "ischeck":false,
                "operations":[

                ],
                "moudles":[

                ]
            },
            {
                "id":"0402",
                "pid":"04",
                "name":"yhqxgl",
                "path":"yhqxgl",
                "mkname":"用户权限管理",
                "zj":"system/yhqxgl",
                "iconclass":"yonghuquanxianguanli",
                "moudleid":"988c0b3ae4a94233842c960f2057a82c",
                "ischeck":false,
                "operations":[

                ],
                "moudles":[

                ]
            },
            {
                "id":"0403",
                "pid":"04",
                "name":"bmgl",
                "path":"bmgl",
                "mkname":"部门管理",
                "zj":"system/bmgl",
                "iconclass":"bumenguanli",
                "moudleid":"996271a831914b7a9fe25ce5de72b11b",
                "ischeck":false,
                "operations":[

                ],
                "moudles":[

                ]
            }
      ]
    }
  ]
}
