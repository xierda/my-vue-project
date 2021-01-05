<template>
  <div class="wrap">
    <el-row v-for="(item, index) in items" :key="index">
      <el-col :span="6" :style="getHeight1(item,index)">
        <el-checkbox v-if="showElCheckBox" @change="CheckChange(item)" :label="item.mkname" v-model="item.ischeck">{{ item.mkname }}</el-checkbox>
        <span v-if="showSpan" :label="item.mkname">{{ item.mkname }}</span>
      </el-col>
      <!-- 第一级没有子集 -->
      <!-- <el-col :span="3" v-for="(subitem, subindex) in item.operations" :key="subindex" v-show="item.moudles.length === 0">
        <el-checkbox v-if="showElCheckBox" :label="subitem.cname" v-model="subitem.ischeck">{{ subitem.cname }}</el-checkbox>
        <span v-if="showSpan" :label="subitem.cname">{{ subitem.cname }}</span>
      </el-col> -->
      <!-- 第一级有子集 -->
      <el-col :span="18" v-if="item.moudles">
        <el-row v-for="(subitem, subindex) in item.moudles" :key="subindex" class="wrap-elrow">
          <el-col :style="getHeight2(subitem,index)" :span="8">
            <el-checkbox v-if="showElCheckBox" @change="CheckChange(subitem)" :label="subitem.mkname" v-model="subitem.ischeck">{{ subitem.mkname }}</el-checkbox>
            <span v-if="showSpan" :label="subitem.mkname">{{ subitem.mkname }}</span>
          </el-col>
          <!-- <el-col :span="4" v-for="(subsubitem, subsubindex) in subitem.operations" :key="subsubindex">
            <el-checkbox v-if="showElCheckBox" @change="CheckChange(subsubitem)" :label="subsubitem.cname" v-model="subsubitem.ischeck">{{ subsubitem.cname }}</el-checkbox>
            <span v-if="showSpan" :label="subsubitem.cname">{{ subsubitem.cname }}</span>
          </el-col> -->
          <!-- 第二级有子集 -->
          <el-col :span="16" v-if="subitem.moudles">
            <el-row v-for="(subsubitem, subsubindex) in subitem.moudles" :key="subsubindex" class="wrap-elrow">
              <el-col :style="getHeight3(subsubitem,index)" :span="4">
                <el-checkbox v-if="showElCheckBox" @change="CheckChange(subsubitem)" :label="subsubitem.mkname" v-model="subsubitem.ischeck">{{ subsubitem.mkname }}</el-checkbox>
                <span v-if="showSpan" :label="subsubitem.mkname">{{ subsubitem.mkname }}</span>
              </el-col>
            </el-row>
          </el-col>
          <!--  -->
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      defaule () {
        return []
      }
    },
    flag: {
      type: String,
      defaule: ''
    }
  },
  data () {
    return {
      miniDivHeight: 49,
      showElCheckBox: false,
      showSpan: true
    }
  },
  mounted () {
    this.showElCheckBox = false
    this.showSpan = true
    if (this.flag === 'edit' || this.flag === 'add') {
      this.showElCheckBox = true
      this.showSpan = false
    }
  },
  methods: {
    getHeight1 (item) {
      let length = 0

      if (item.moudles && item.moudles.length) {
        let item1 = item.moudles
        item1.map(subitem1 => {
          if (subitem1.moudles && subitem1.moudles.length) {
            length += subitem1.moudles.length
          } else {
            length += 1
          }
        })
      } else {
        length = 1
      }

      let height = this.miniDivHeight

      return `background: #ffe4c4;height:${length * height}px;line-height:${length * height - 28}px;`
    },
    getHeight2 (item) {
      let length = item.moudles.length > 0 ? item.moudles.length : 1
      let height = this.miniDivHeight
      if (item.moudles && item.moudles.length > 0) {
        item.moudles.forEach(el => {
          if (el.operations && el.operations.length > 0) {
            let ellength = Math.floor(el.operations.length / 5)
            if (el.operations.length % 5 === 0) {
              ellength -= 1
            }
            length += ellength
          }
        })
      }
      return `background: #ffebcd;height:${length * height}px;line-height:${length * height - 28}px;`
    },
    getHeight3 (item) {
      if (item.operations && item.operations.length > 0) {
        let length = item.operations.length
        let height = this.miniDivHeight
        let ellength
        if (length % 5 !== 0) {
          ellength = Math.ceil(length / 5)
        } else {
          ellength = length / 5
        }
        return `background: #fff5e7;border-bottom: none;height:${ellength * height}px;line-height:${ellength * height - 28}px;`
      }
    },
    CheckChange (item) {
      // 正向勾选控制
      if (item.moudles && item.moudles.length > 0) {
        item.moudles.forEach(element => {
          element.ischeck = item.ischeck
          if (element.operations && element.operations.length > 0) {
            element.operations.forEach(ele => {
              ele.ischeck = item.ischeck
            })
          }
          if (element.moudles && element.moudles.length) {
            element.moudles.forEach(threeItem => {
              threeItem.ischeck = element.ischeck
            })
          }
        })
      }
      if (item.operations && item.operations.length > 0) {
        item.operations.forEach(element => {
          element.ischeck = item.ischeck
        })
      }
      // 反向选中控制
      if (item.ischeck) {
        let firstId = item.id.slice(0, 2)
        let secondId = item.id.slice(0, 4)
        this.items.map(firstItem => {
          if (firstItem.id === firstId) {
            firstItem.ischeck = item.ischeck
            if (firstItem.moudles && firstItem.moudles.length) {
              firstItem.moudles.map(secondItem => {
                if (secondItem.id === secondId) {
                  secondItem.ischeck = item.ischeck
                }
              })
            }
          }
        })
      }
    }
  },
  watch: {
    flag (newVal) {
      if (newVal) {
        this.showElCheckBox = false
        this.showSpan = true
        if (newVal === 'edit' || newVal === 'add') {
          this.showElCheckBox = true
          this.showSpan = false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 0px; /*去除el-row之间的间距*/
  border: 1px solid #dcdcdc;
  margin: -1px -1px -1px -1px; /*解决相邻边框重叠问题就靠这行代码*/
  &:last-child {
    margin-bottom: 0px;
  }
}
.el-col {
  background: white;
}
.wrap-elrow {
  border-bottom: none;
}
.role-management .el-checkbox {
  padding: 15px 0px 14px 20px;
  color: #323234;
  border-bottom: none;
}
.role-management span {
  padding: 15px 0px 14px 20px;
  color: #323234;
  border-bottom: none;
  font-size: 14px;
  width: 180px;
  display: inline-block;
}
</style>
