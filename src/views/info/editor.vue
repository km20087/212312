<template lang="html">  
  <div class="editor">  
    <div ref="toolbar" class="toolbar">  
    </div>  
    <div ref="editor" class="text">  
    </div>  
  </div>  
</template>  
  
<script>
import E from "wangeditor";
// import "wangeditor/release/wangEditor.min.css";
export default {
  name: "editoritem",
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy();
    this.editor = null;
  },
  methods: {
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig = this.editor.customConfig
        ? this.editor.customConfig
        : this.editor.config; //兼容旧版
      this.editor.customConfig.uploadImgShowBase64 = true; // base 64 存储图片
      //   this.editor.customConfig.uploadImgServer = "/upload-img"; // 配置服务器端地址 http://otp.cdinfotech.top/file/upload_images
      this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
      // 自定义 onchange 触发的延迟时间，默认为 200 ms
      this.editor.customConfig.onchangeTimeout = 1000; // 单位 ms
      // 隐藏�网络图片�tab
      // this.editor.customConfig.showLinkImg = false
      // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
      // this.editor.customConfig.emotions = [
      //     {
      //         // tab 的标题
      //         title: '默认',
      //         // type -> 'emoji' / 'image'
      //         type: 'image',
      //         // content -> 数组
      //         content: [
      //             {
      //                 alt: '[坏笑]',
      //                 src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
      //             },
      //             {
      //                 alt: '[舔屏]',
      //                 src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
      //             },
      //             {
      //                 alt: "[哈哈]",
      //                 src: "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/2018new_haha_org.png",
      //             },
      //             {
      //                 src : "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif",
      //                 alt : "[草泥马]"
      //             }
      //         ]
      //     },
      //     {
      //         // tab 的标题
      //         title: 'emoji',
      //         // type -> 'emoji' / 'image'
      //         type: 'emoji',
      //         // content -> 数组
      //         content: ['😀', '😃', '😄', '😁', '😆']
      //     }
      // ],
      // 配置菜单
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
        "fullscreen", // 全屏
      ];
      this.editor.config.fontSizes = {
        "x-small": { name: "10px", value: "1" },
        small: { name: "13px", value: "2" },
        normal: { name: "16px", value: "3" },
        large: { name: "18px", value: "4" },
        "x-large": { name: "24px", value: "5" },
        "xx-large": { name: "32px", value: "6" },
        "xxx-large": { name: "48px", value: "7" },
      };
      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          console.log(xhr);
          console.log(editor);
          console.log(result);
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          console.log(xhr);
          console.log(editor);
          console.log(result);
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          console.log(xhr);
          console.log(editor);

          // 网络超时的回调
        },
        error: (xhr, editor) => {
          console.log(xhr);
          console.log(editor);

          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          console.log(editor);
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          if (result.code == 200) {
            let url = result.data.image_url;
            JSON.stringify(url);
            insertImg(url);
          } else {
            this.$Message.error(result.msg);
          }
          // }
        },
      };
      this.editor.customConfig.onchange = (html) => {
        // let jspn1 = this.editor.txt.getJSON();
        // let jspn2 = JSON.stringify(jspn1);
        this.info_ = html; // 绑定当前逐渐地值
        // this.info_ = JSON.stringify(jspn1);
        // console.log(html);
        // console.log(jspn2);
        // this.$emit("change", jspn1); // 将内容同步到父组件中
        this.$emit("change", this.info_); // 将内容同步到父组件中
      };
      // 创建富文本编辑器
      this.editor.create();
    },
  },
};
</script>  
  
<style lang="less" scope>
.w-e-text {
  font-size: 16px;
}
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style> 