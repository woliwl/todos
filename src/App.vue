<template>
  <div id="app">
	  <div class="todosBox">
		  <!-- 1.输入框 -->
		  <div class="input">
			<el-input placeholder="你打算做什么？" v-model="text" clearable 
			@keyup.enter.native="addList">
			</el-input>
			<i class="el-icon-circle-check" @click="addList"></i>
		  </div>
		  
		  <!-- 2.事件统计 -->
		  <div class="census">
			  <span><p>总事件：</p><p>{{count}}</p></span>
			  <span><p>未完成：</p><p>{{count-complete}}</p></span>
			  <span><p>已完成：</p><p>{{complete}}</p></span>
		  </div>
		  
		  <!-- 3.事件列表 -->
		  <div class="listBox">
			  <div class="list" v-for="(item,index) in lists" :key = "index">
				  <el-checkbox v-model="item.isChecked" @change="isActive">{{item.text}}</el-checkbox>
				  <i class="el-icon-close" @click="delList(index)"></i>
			  </div>
		  </div>
		  
	  </div>
	  
  </div>
</template>

<script>
	import {mapState} from "vuex";
	import {mapGetters} from "vuex";
export default {
  name: "App",
  data(){
	  return{
		  text:''
	  }
  },
  computed:{
	 ...mapState(["lists"]),
	 
	 // 事件总数
	 count(){
		 return this.lists.length
	 },
	 
	 // 已完成
	 complete(){
		 let num = 0
		 this.lists.forEach(e => {
			 if(e.isChecked == true){
				 num ++
			 }
		 })
		 return num
	 }
  },
  methods:{
	  addList(){
		  if(this.text){
			  // text待办事项 isChecked是否完成（默认未完成）
			  let param = {text:this.text,isChecked:false}
			  this.$store.commit('add',param)
			  this.sorting()
			  this.text = ''
		  }else{
			  this.$message({
				  message: '不可为空哦！',
				  center: true,
				  type: 'warning'
			  })
		  }
	  },
	  
	  delList(param){
		 this.$store.commit('del',param)
	  },
	  
	  isActive(e){
		this.sorting()
	  },
	  
	  // 排序
	  sorting(){
		  this.lists.sort((a,b) => a.isChecked - b.isChecked)
	  },
	  
	  // 页面刷新数据不丢失
	  storage(){
		  if (sessionStorage.getItem('store')) {
		        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
		      }
		  window.addEventListener('beforeunload',() => {
			  sessionStorage.setItem('store',JSON.stringify(this.$store.state))
		  })
	  }
  },
  created() {
  	this.storage()
  }
  
 
};
</script>

<style lang="scss">
	#app {
		width: 100%;
		height: 100%;
		background: #ececec;
		position: absolute;
		
		.todosBox {
			width: 352px;
			margin: 100px auto;
			min-height: 450px;
			background: #fff;
			box-shadow: 0px 8px 24px rgba($color: #5b5b5b, $alpha: 0.3);
			border-radius: 5px;
			.input{
				.el-input{
					width: 84%;
					height: 40px;
					margin: 10px 2%;
					font-size: 14px;
					padding: 2px;
				}
				.el-icon-circle-check{
					font-size: 30px;
					vertical-align: middle;
					color: #409EFF;
					cursor: pointer;
				}
			}
		}
		
		.census{
			width: 90%;
			height: 30px;
			font-size: 12px;
			display: flex;
			margin: 0 auto;
			justify-content: space-around;
			span{
				display: flex;
				align-items: center;
				color: #5b5b5b;
				
			}
			span:nth-child(2){
				p:last-child{
					color: #FF0000;
				}
			}
			span:nth-child(3){
				p:last-child{
					color: #409EFF;
				}
			}
		}
		
		.listBox{
			width: 90%;
			margin: 5px auto;
			.list{
				width: 100%;
				height: 25px;
				background: rgba($color: #ececec, $alpha: 0.3);
				margin-bottom: 10px;
				.el-checkbox{
					padding: 0 5px;
					width: 90%;
				}
				.el-checkbox__inner{
					border-color:#409EFF;
				}
				.el-checkbox__label{
					color: #409EFF;
				}
				.el-checkbox__input.is-checked .el-checkbox__inner{
					background: #5b5b5b;
					border-color:#5b5b5b;
				}
				.el-checkbox__input.is-checked+.el-checkbox__label{
					color: #5b5b5b;
					text-decoration: line-through;
				}
				.el-icon-close{
					color: #409EFF;
					vertical-align: middle;
				}
				

			}
		}
	}
</style>
