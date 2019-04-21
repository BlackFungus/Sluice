
<template>
  <div>
    <div class="bg-color"></div>
    <el-container>
      <el-main>
        <br>
        <br>
        <br>
        <br>
        <el-row :gutter="25">
          <el-col :span="10" :offset="7">
            <el-card class="box-card box-card-size">
              <div slot="header" class="clearfix">
                <span>控制面板</span>
                
              </div>
              <el-row :gutter="20">
                <el-col :span="12">
                  压力：
                  <el-input
                    type="textarea"
                    :rows="2"
                    readonly="true"
                    placeholder="请输入内容"
                    v-model="pressure1"
                  ></el-input>
                </el-col>
                <el-col :span="12">
                  压力：
                  <el-input
                    type="textarea"
                    :rows="2"
                    readonly="true"
                    placeholder="请输入内容"
                    v-model="pressure2"
                  ></el-input>
                </el-col>
              </el-row>
              <br>
              <br>
              <el-row :gutter="20">
                <el-col :span="6">
                  全开
                  <button :class="light1==true?'open':'close'" class="light" disabled></button>
                </el-col>
                <el-col :span="6">
                  全关
                  <button :class="light2==true?'open':'close'" class="light" disabled></button>
                </el-col>
                <el-col :span="6">
                  全开
                  <button :class="light3==true?'open':'close'" class="light" disabled></button>
                </el-col>
                <el-col :span="6">
                  全关
                  <button :class="light4==true?'open':'close'" class="light" disabled></button>
                </el-col>
              </el-row>
              <br>
              <br>
              <el-row :gutter="60">
                <el-col :span="6">
                  <el-button type="primary" @click="Switch('OPENXFB1')">开泵</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" @click="Switch('CLOSEXFB1')">关泵</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" @click="Switch('OPENXFB2')">开泵</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button type="primary" @click="Switch('CLOSEXFB2')">关泵</el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { setInterval } from "timers";
export default {
  name: "index",
  data: function() {
    return {
      visible: false,
      light1: true,
      light2: true,
      light3: true,
      light4: true,
      pressure1: "asd",
      pressure2: "asdasd"
    };
  },
  created: function() {
    this.getData();
    setInterval(this.getData, 1000);
  },
  methods: {
    Switch(order) {
      axios
        .get("/api/open", {
          params: {
            order
          }
        })
        .then(function(res) {
          console.log(res);
        });
    },
    getData() {
      let _this = this;
      axios.get("/api/getData").then(function(res) {
        console.log(res);
        _this.pressure1 = res.data.pressure1;
        _this.pressure2 = res.data.pressure2;
        if (res.data.sighal1 != "00") _this.light1 = false;
        if (res.data.sighal2 != "00") _this.light2 = false;
        if (res.data.sighal3 != "00") _this.light3 = false;
        if (res.data.sighal4 != "00") _this.light4 = false;
      });
    }
  }
};
</script>
<style>
.bg-color {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 0;
  right: 0;
  bottom: 60%;
  top: 0;
  background-color: #c0c4cc;
  z-index: -1;
}

.box-card-size {
  height: 500px;
}

.light {
  padding: 20px !important;
  border: 1px solid #409eff;
  border-radius: 50%;
}

.open {
  background-color: #13ce66;
  padding: 20px !important;
  cursor: default;
}

.close {
  background-color: #909399;
  padding: 20px !important;
  cursor: default;
}

.switch-size {
  size: 20px;
}
</style>