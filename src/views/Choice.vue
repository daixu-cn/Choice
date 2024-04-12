<template>
  <div id="Choice">
    <div class="container">
      <ul class="description">
        <li class="tips">Tips: 该应用数据全部存储在本地且仅保存上一次的录入</li>
        <li class="tips">
          GitHub:
          <a href="https://github.com/daixu-cn/Choice" target="_blank"
            >https://github.com/daixu-cn/Choice</a
          >
        </li>
      </ul>
      <el-table :data="tableData" class="option-table" empty-text="暂无选项～">
        <el-table-column label="选项配置:">
          <template #default="scope">
            <el-input
              v-model="tableData[scope.$index].option"
              placeholder="输入选项描述（例如：吃泡面）:"
            />
          </template>
        </el-table-column>
        <el-table-column width="100" align="center">
          <template #header>
            <el-button type="primary" @click="createOption">新增选项</el-button>
          </template>
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="deleteOption(scope.$index)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="option-operator">
        <el-tabs v-model="operatorType">
          <el-tab-pane label="文本随机" name="operator-text">
            <TextModel
              v-if="optionsList.length >= 2"
              :options-list="optionsList"
            />
            <span v-else>请至少添加两个选项</span>
          </el-tab-pane>
          <el-tab-pane label="转盘随机" name="operator-turntable">
            <TurntableModel
              v-if="optionsList.length >= 2"
              :options-list="optionsList"
            />
            <span v-else>请至少添加两个选项</span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect, computed } from "vue"
import type { TableData } from "./types"
import TextModel from "./Models/TextModel.vue"
import TurntableModel from "./Models/TurntableModel.vue"

const operatorType = ref("operator-text")
const defaultOptions = `[{"option":"Japan"},{"option":"Germany"},{"option":"America"},{"option":"Canada"},{"option":"Australia"}]`
const tableData: TableData[] = reactive(
  JSON.parse(localStorage.getItem("Choice-options") || defaultOptions) ||
    JSON.parse(defaultOptions)
)
const optionsList = computed(() => {
  return tableData.filter(item => item.option)
})

watchEffect(() => {
  if (optionsList.value.length) {
    localStorage.setItem("Choice-options", JSON.stringify(optionsList.value))
  } else {
    localStorage.removeItem("Choice-options")
  }
})

function createOption() {
  tableData.push({
    option: ""
  })
}
function deleteOption(index: number) {
  tableData.splice(index, 1)
}
</script>

<style lang="scss">
#Choice {
  width: 1200px;
  margin: 20px auto;

  .description {
    margin-bottom: 12px;
    line-height: 1.5em;
    .tips {
      color: #f56c6c;
      a {
        color: #f56c6c;
      }
    }
  }
  .container {
    .option-table {
      margin-bottom: 20px;
      .el-input__wrapper {
        box-shadow: none;
        background-color: transparent;
      }
    }
    .el-tabs {
      user-select: none;
      .el-tab-pane {
        width: 100%;
        height: 320px;
        font-size: 1.5em;
        color: $color-primary;
        @include flex-center;
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  #Choice {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
@media screen and (max-width: 450px) {
  #Choice {
    .description {
      display: none;
    }
  }
}
</style>
