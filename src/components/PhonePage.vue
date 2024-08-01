<template>
   <div class="phoneMain">
     <van-form @submit="onSubmit">
      <van-field
         v-model="txHash"
         name="txHash"
         label="地址/交易Hash"
         placeholder="地址/交易Hash"
         :rules="[{ required: true, message: '请填写地址' }]"
      />
      <van-field
         readonly
         clickable
         name="type"
         :value="type"
         label="币种"
         placeholder="选择币种"
         @click="showPicker = true"
          :rules="[{ required: true, message: '选择币种' }]"
      />
      <van-field
         readonly
         clickable
         name="sourceType"
         :value="sourceType"
         label="来源类型"
         placeholder="选择来源类型"
         @click="showSourceType = true"
      />
      
         <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">搜索</van-button>
         </div>
      </van-form>
      <van-popup v-model="showPicker" position="bottom">
         <van-picker
            show-toolbar
            :columns="typeColumns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
         />
      </van-popup>
       <van-popup v-model="showSourceType" position="bottom">
         <van-picker
            show-toolbar
            :columns="sourceTypeList"
            @confirm="onSourceConfirm"
            @cancel="showSourceType = false"
            :default-index="2"
         />
      </van-popup>
      <van-list
         class="resList"
         v-model="loading"
         :finished="finished"
         :finished-text="finishedText"
         @load="onLoad"
         >
            <van-cell v-for="item in list" :key="item.id" class="resItem" >
               <div class="listContent">
                  <p class="textWrap"><span class="label">来源地址：</span>{{ item.fromAddress }}</p>
                  <p class="textWrap"><span class="label">转入地址：</span>{{ item.toAddress }}</p>
                  <p class="textWrap"><span class="label">交易Hash：</span>{{ item.txHash}}</p>
                  <p class="textWrap"><span class="label">日期：</span>{{ this.$dayjs(item.convertTime).format('YYYY-MM-DD hh:mm:ss')}}</p>
                  <div>
                     <van-row>
                        <van-col span="10"><span >币种：</span>{{ item.type}}</van-col>
                        <van-col span="14"><span >金额：</span>{{ item.amount}}</van-col>
                     </van-row>
                  </div>
               </div>
            </van-cell>
         </van-list>
   </div>
</template>
<script>
export default {
   name: 'phone-page',
   components: {
     
   },
   mixins: [],
   props: {
     
   },
   data() {
    return {
      loading: false,
      finished: false,
      showPicker: false,
      showSourceType: false,
      finishedText:'',
      txHash: '',
      type: '',
      currentPage:1,
      total:0,
      submitParams:null,
      sourceType:'全部',
      typeColumns:[], // 币种列表
      list: [], // 分页列表
      sourceTypeList:[ { text: '全部', value:0},
        { text: '转入' , value:1},
        { text: '转出' , value:2},]
    };
  },
   methods: {
      convertColumns(data = []){
         if(!Array.isArray(data)){
            console.error('data is not array')
            return []
         }
         return data.map(t=>({text:t?.coin,value:t?.type}))
      },
      formatValue(str,sourceArr){
         return sourceArr.find(t=>t.text === str).value
      },
      fetchCoinType(){
         this.$request.getTokenTransferLogs().then(res=>{
            if(res.code!==200){
               this.$Toast.fail(res.message);
               return 
            }
            const {data} = res
            this.typeColumns = convertColumns(data)
         })
      },
      onSourceConfirm(){
         this.showSourceType = false;
      },
      onSubmit(values) {
         console.log('submit', values);
         const params = {
            ...values,
            pageNum:1,
            pageSize:20,
            type:this.formatValue(values.type,this.typeColumns),
            sourceType:this.formatValue(values.sourceType,this.sourceTypeList)
         }
         this.currentPage = 1;
         this.submitParams = params;
         console.log('submit params', params);
         this.onLoad();

      },
      
       onConfirm(value) {
         this.type = value?.text
         this.showPicker = false;
      },
        onLoad() {
         console.log('到底了')
         if(!this.submitParams) {
            this.finished = true
            this.finishedText = '暂无数据,请按条件搜索.'
            return
         } 
           this.loading = true;
           this.finished = false;
           this.$request.getTokenTransferPages(this.submitParams).then(res=>{
            if(res.code!==200){
               this.$Toast.fail(res.message);
               return 
            }
            this.loading = false;
            this.total = res.data.total
            this.currentPage = this.currentPage+1
            this.list = this.list.concat(res.data.list)
            if(res.data.total <= this.list.length){
               this.finished = true
               this.finishedText = '已无更多数据.'
            }
             
           
         })
         
      },
   },
   computed: {
     
   },
   watch: {
     
   },
   mounted() {
     this.fetchCoinType()
   },
   
};
</script>
<style lang='scss' scoped>
.phoneMain{
   max-width:900px;
   margin:0 auto;
   // min-height:100vh;
}
.label{
   width: 86px;
   display: inline-block;
}
 .resList {
      .resItem:nth-child(odd){
      background-color:#f0f0f0
   }
}
.textWrap{
       margin-bottom: 4px;
    border-bottom: 1px dashed #e3e3e3;
}

</style>