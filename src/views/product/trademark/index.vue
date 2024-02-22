<script setup lang="ts">
import { reactive, ref } from "vue";
import { onMounted } from "vue";
import {
  reqAddOrUpdateTrademark,
  reqHasTrademark,
} from "@/api/product/trademark";
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type.ts";
import { ElMessage, UploadProps } from "element-plus";

let pageNo = ref<number>(1);
let limit = ref<number>(3);

//存储已有品牌的数据总数
let total = ref<number>(0);

//存储已有品牌的数据
let trademarkArr = ref<Records>([]);

let drawerFormVisible = ref<boolean>(false);

//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});

//获取已有品牌的接口封装为一个函数
const getHasTrademark = async () => {
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  );
  if (result.code === 200) {
    //存储已有品牌的总个数
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};

//挂载完毕发一次请求
onMounted(() => {
  getHasTrademark();
});

const sizeChange = () => {
  pageNo.value = 1;
  getHasTrademark();
};

const addTrademark = () => {
  drawerFormVisible.value = true;
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
};
const updateTrademark = () => {
  drawerFormVisible.value = true;
};
const cancel = () => {
  drawerFormVisible.value = false;
};

const confirm = async () => {
  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  if (result.code === 200) {
    //关闭对话框
    drawerFormVisible.value = false;
    //弹出提示信息
    ElMessage({
      type: "success",
      message: "添加品牌成功",
    });
    //再次发请求获取已有全部的品牌数据
    await getHasTrademark();
  } else {
    //关闭对话框
    drawerFormVisible.value = false;
    ElMessage({
      type: "error",
      message: "添加品牌失败",
    });
  }
};

//图片上传->图片上传之前触发的钩子
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type === "image/png" ||
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传的文件大小不能大于4Mb",
      });
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传的文件务必为PNG|JPG|GIF",
    });
  }
};

//图片上传成功的钩子
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile,
) => {
  //response是请求返回的数据
  //收集上传图片的地址将来新增品牌的时候带给服务器
  trademarkParams.logoUrl = response.data;
};
</script>

<template>
  <div>
    <el-card class="box-card">
      <!--    卡片顶部的添加品牌按钮-->
      <el-button type="primary" size="default" @click="addTrademark" icon="Plus"
        >添加品牌
      </el-button>
      <!--    表格组件,用于展示已有的品牌数据-->
      <el-table style="margin: 10px 0" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称">
          <template #="{ row, $index }">
            <pre style="color: #646469">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--    分页器组件-->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="sizeChange"
      />
    </el-card>

    <!--  //对话框组件-->
    <el-drawer
      v-model="drawerFormVisible"
      title="添加品牌"
      direction="btt"
      size="55%"
    >
      <el-form style="margin: 0 20%">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input
            placeholder="请输入品牌的名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="margin-right: 20%">
          <el-button type="warning" size="default" @click="cancel"
            >取消</el-button
          >
          <el-button type="primary" size="default" @click="confirm"
            >确定</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
