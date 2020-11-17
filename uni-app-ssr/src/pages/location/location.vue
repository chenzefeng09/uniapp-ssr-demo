<template>
  <view>
    <view class="root">
      <view class="filter_level level0">
        <view
          v-for="(item, index) in addrLevel0"
          :key="index"
          v-show="!(limit && item.id === -1)"
          @tap="addrSelect($event,{level:0,item:item})"
          :class="['filter_level_item','filter_level0_item', 'filter_level0_item_active_' + (level0_acitve.id === item.id)]">{{item.name}}</view>
      </view>
      <view
        class="filter_level level1"
        v-show="!(!addrLevel1 || !addrLevel1.length)">
        <view
          v-for="(item, index) in addrLevel1"
          :key="index"
          v-show="!(limit && limit > 1 && item.id === -1)"
          @tap="addrSelect($event,{level:1,item:item})"
          :class="['filter_level_item' ,'filter_level1_item' ,'filter_level1_item_active_' + (level1_acitve.id === item.id)]">{{item.name}}</view>
      </view>
      <view
        class="filter_level level2"
        v-show="!(!addrLevel2 || !addrLevel2.length)">
        <view
          v-for="(item, index) in addrLevel2"
          :key="index"
          v-show="!(limit && limit > 2 && item.id === -1)"
          @tap="addrSelect($event,{level:2,item:item})"
          class="filter_level_item filter_level2_item">{{item.name}}</view>
      </view>
    </view>
    <!-- <home-btn></home-btn> -->
  </view>
</template>

<script>
// pages/location/location.js
// const util = require("../../utils/util.js");
// const app = getApp();
// import homeBtn from "../../components/home_btn/home_btn";

export default {

  components: {
    // homeBtn
  },
  props: {},
  data() {
    return {
      addrLevel0: [],
      addrLevel1: [],
      addrLevel2: [],
      limit: "",
      level0_acitve: "",
      level1_acitve: ""
    };
  },

  /**
   * 生命周期函数--监听页面加载
   * limit: 1：地址至少选到省，2：地址至少选到市，3：地址至少选到县，没有则不限制
   */
  onLoad: function (options) {
    // app.initPage(this, options);

    // if (this.options.limit) {
    //   this.setData({
    //     limit: parseInt(this.options.limit)
    //   });
    // }

    // this.getLocation(0, '全部', 0);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  methods: {
    /**
     * 取分级行政区划
     */
    getLocation: function (id, name, level, item = {}) {
      console.log('getLocation')
      this.get("/jy/location/v2/sublist?locid=" + id, {},
        res => {
          if ([-200, 500, 404].indexOf(res.status) !== -1 || res.data.length === 0) {
            this.submitAddr(item, level - 1);
            return;
          }

          if ([0, 1, 2].indexOf(level) >= 0) {
            const ob = {};

            if (res.data) {
              try {
                if (res.data[0].id != -1) {
                  res.data.unshift({
                    parentId: id,
                    parentName: name,
                    parentAdCode: item.adcode,
                    id: -1,
                    name: '全部'
                  });
                }
              } catch (e) {
                console.log(e);
              }
            }

            ob["addrLevel" + level] = res.data;
            this.setData(ob);
            // #ifdef MP-WEIXIN
            //上面的赋值在微信端运行异常，调用原生的再赋值一遍
            try {
              this.$scope.setData(ob);
            } catch (error) {}
            // #endif

          }
        }
      );
    },

    /**
     *  地址筛选
     */
    addrSelect: function (e, datasetCollect) {
      console.log(e, datasetCollect)
      const data = datasetCollect;
      if (data.item.name == '全部') return;

      if (data.level === 0) {
        this.setData({
          level0_acitve: data.item,
          addrLevel1: [],
          addrLevel2: []
        });
      } else if (data.level === 1) {
        this.setData({
          level1_acitve: data.item,
          addrLevel2: []
        });
      } else {
        this.submitAddr(data.item, data.level);
        return;
      }

      if (data.item.id === -1) {
        this.submitAddr(data.item, data.level);
      } else {
        this.getLocation(data.item.id, data.item.name, data.level + 1, data.item);
      }
    },

    /**
     * 提交选择结果
     */
    submitAddr: function (item, index) {
      let selectOb = {};
      console.log(123)
      if (item.id === -1) {
        selectOb = {
          id: item.parentId === 0 ? -1 : item.parentId,
          name: item.parentName === '全国' ? -1 : item.parentName
        };
      } else {
        selectOb = item;
      }

      if (index === 2) {
        selectOb.level0 = this.level0_acitve;
        selectOb.level1 = this.level1_acitve;

        if (selectOb.level1.id != selectOb.id) {
          selectOb.level2 = {
            id: selectOb.id,
            name: selectOb.name
          };
        }

        selectOb.fullName = `${selectOb.level0.name}${selectOb.level1.name}${selectOb.name}`;
      } else if (index === 1) {
        selectOb.level0 = this.level0_acitve;

        if (selectOb.level0.id != selectOb.id) {
          selectOb.level1 = {
            id: selectOb.id,
            name: selectOb.name
          };
        }

        selectOb.fullName = `${selectOb.level0.name}${selectOb.name}`;
      } else if (index === 0) {
        selectOb.fullName = selectOb.name;
      }

      app.setGlobal('locationFilter', selectOb);
      uni.$emit('chooseLocationResult',selectOb)
      wx.navigateBack();
    }
  }
};
</script>
