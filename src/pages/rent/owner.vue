<template>
  <div class="container">
    <a-form
      ref="formRef"
      name="advanced_search"
      class="search-form"
      :model="formState"
      @finish="onFinish"
      layout="inline"
    >
      <a-form-item name="build" label="小区">
        <a-input v-model:value="formState.build" placeholder="请输入小区名"></a-input>
      </a-form-item>
      <a-form-item name="build" label="楼号">
        <a-input v-model:value="formState.build" placeholder="18楼402室,输18-402"></a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="default" class="submit_btn" html-type="submit">查询</a-button>
        <a-button style="margin: 0 8px" class="default_btn" @click="resetForm">清空</a-button>
      </a-form-item>
    </a-form>
    <div class="tool">
      <a-button type="default" class="submit_btn">新增租单</a-button>
      <a-button type="default" class="default_btn">模板下载</a-button>
      <a-button type="default" class="default_btn">导入</a-button>
      <a-button type="default" class="default_btn">导出</a-button>
    </div>
    <div class="search-result-list">
      <a-table :columns="columns" :data-source="data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Name </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a>Invite 一 {{ record.name }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                More actions
                <down-outlined />
              </a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import { reactive, ref } from 'vue'

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

interface FormState {
  build: number | null
}

const formRef = ref<FormInstance>()
const formState = reactive<FormState>({
  build: null,
})
const onFinish = (values: any) => {
  console.log('Received values of form: ', values)
  console.log('formState: ', formState)
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<style lang="less" scoped>
.container {
  // border: 1px solid black;
  height: 100%;
  .search-form {
    // border: 1px solid red;
    margin-bottom: 10px;
  }
  .tool {
    line-height: 30px;
    margin-bottom: 15px;
    .submit_btn {
      margin-right: 10px;
    }
    .default_btn {
      margin-right: 10px;
    }
  }
}
.submit_btn {
  width: 100px;
  color: #ffffff;
  border-color: @theme-color;
  height: 35px;
  background-color: @theme-color;
}
.default_btn {
  width: 100px;
  color: #ffffff;
  border-color: @theme-color;
  height: 35px;
  color: @theme-color;
}
</style>
