<template>
   <div class="phoneMain">
      <div class="coinType-wrap">
       <van-field
         readonly
         clickable
         :value="coinType"
         label="币种"
         placeholder="选择币种"
         @click="showPicker = true"
          :rules="[{ required: true, message: '选择币种' }]"
      />
      </div>
      <div class="coinType-wrap">
       <van-field
         v-model="pass"
         label="密码"
         required
         type="password"
         :error="passError"
         placeholder="请输入密码"
      />
      </div>
      <ul class="list-wrap">
         <li class="item-wrap"  v-for="(item, index) in fields" :key="index"> 
            <div class="field-wrap">
                 <van-field
                     v-model="item.address"
                     :error="item.addressError"
                     label="地址"
                     placeholder="请输入地址"
                  />
                  <van-field
                     v-model="item.amount"
                     :error="item.amountError"
                     label="金额"
                     type="number"
                     placeholder="请输入金额"

                  />
            </div>
            <div class="button-wrap" v-if="fields.length>1">
                <van-button size="small" type="danger" @click="deleteField(index)"><van-icon name="delete-o" /></van-button>
            </div>
         </li>
      </ul>
     
      <van-row gutter="20"  type="flex" justify="center">
         <van-col span="10">
             <van-button @click="addField" type="primary" block>增加地址</van-button>
         </van-col>
         <van-col span="10">
             <van-button @click="onSubmit" type="info" block>批量转账</van-button>
         </van-col>
      </van-row>
       <van-popup v-model="showPicker" position="bottom">
         <van-picker
            show-toolbar
            :columns="typeColumns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
         />
      </van-popup>
    
      <van-overlay :show="showOverlay" >
         <div class="wrapper">
           <van-loading color="#1989fa"  vertical>交易进行中...</van-loading>

         </div>
      </van-overlay>
     
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
      fields: [
        { address: '', amount: '' ,addressError:false,amountError:false}
      ],
      pass:'',
      passError:false,
      showOverlay:false,
      loading: false,
      coinType:'USDT',
      showPicker:false,
      typeColumns:[
         {text:'USDT',id:0}
      ]
    };
  },
   methods: {
      trim(str) {
         return str.replace(/\s/g, "");
      },
      deleteField(index){
         this.fields = this.fields.filter((t,i)=>i!==index)
      },
    
      validHasAddress(str){
         const trimStr = this.trim(str)
         return !trimStr
      },
      validAmount(value){
          return !value     
      },

      validFields(){
         const next = this.fields.map(t=>{
            return {...t,addressError:this.validHasAddress(t.address),amountError:this.validAmount(t.amount)}
         })

         const res = next.every((t)=>{
            return !t.addressError&&!t.amountError
         })
         if(!res){
            this.fields = next
         }
         return !res
      },
      addField() {
         const validResult = this.validFields()
         if(validResult){
            return 
         }
         this.fields.push({ address: '', amount: '' ,addressError:false,amountError:false});
      },
      onClickIcon(index) {
         // 实现点击图标后的逻辑，例如删除字段等
         this.fields.splice(index, 1);
      },
       formatValue(str,sourceArr){
         return sourceArr.find(t=>t.text === str).id
      },
      convertColumns(data = []){
         if(!Array.isArray(data)){
            console.error('data is not array')
            return []
         }
         return data.map(t=>({text:t?.coin,id:t?.id}))
      },
  
      fetchCoinType(){
         this.$request.getTokenTransferLogs().then(res=>{
            if(res.code!==200){
               this.$Toast.fail(res.message);
               return 
            }
            const {data} = res
            const next = convertColumns(data)
            this.typeColumns = next
            this.coinType = next[0]?.text
         })
      },
     
      onSubmit() {
         if(!this.pass){
            this.passError = true
            return
         }
         this.passError = false
          const validResult = this.validFields()
            if(validResult){
               return 
            }
            this.showOverlay = true
         const params = {
            pass:this.pass,
            coinType: this.formatValue(this.coinType,this.typeColumns),
            list:this.fields.map(t=>({address:t.address,amount:t.amount}))
         }
         this.$request.submitTransition(params)
         .then(res=>{
            if(res.code!==200){
               this.$Toast.fail(res.message);
               return 
            }
            // 重置fields
            this.fields = [
               { address: '', amount: '' ,addressError:false,amountError:false}
            ]
         })
         .finally(()=>{
              this.showOverlay = false
         })
        

      },
      onConfirm(value) {
         this.coinType = value?.text
         this.showPicker = false;
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
.coinType-wrap{
   margin: 10px;
}
.list-wrap{
   margin: 30px 0;
}
.item-wrap{
   display: flex;
   margin: 10px;
   background: #fff;
   .field-wrap{
      flex: 1;
   }
   .button-wrap{
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 10px;
   }
}
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

</style>