import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
	  // 所有事件
	  lists:[]
  },
  mutations: {
	  // 添加事件
	  add:(state,param) => {
		  state.lists.push(param)
	  },
	  // 删除事件
	  del:(state,param) => {
		  state.lists.splice(param,1)
	  }
  },
  actions: {
	  addAction(context,param){
		  context.commit('add',param)
	  },
	  delAction(context,param){
		  context.commit('del',param)
	  }
  },
  modules: {}
});
