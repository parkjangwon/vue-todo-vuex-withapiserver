import axios from 'axios';

const api_url = process.env.VUE_APP_APIURL;

const state = {
  todoItems: []
};

const getters = {
  getTodoItems(state) {
    return state.todoItems;
  }
};

const actions = {
  loadTodoItems(context) {
    axios
      .get(`${api_url}`)
      .then(res => res.data)
      .then(items => context.commit('setTodoItems', items))
      .catch(error => console.log(error));
  },
  removeTodo(context, payload) {
    const id = payload.todoItem.id;
    state.todoItems.splice(payload.index, 1);
    this.getTodoItems;
    axios
      .delete(`${api_url}/${id}`)
      .then(res => res.data)
      .catch(error => console.log(error));
  },
  addTodo(context, payload) {
    axios
      .post(`${api_url}`, payload)
      .then(res => res.data)
      .then(items => {
        // resposne data가 모두 String으로 오기 때문에, boolean 처리를 위해...
        items.completed = 0;
        state.todoItems.push(items);
        this.getTodoItems;
      })
      .catch(error => console.log(error));
  },
  clearTodo() {
    state.todoItems = [];
    this.getTodoItems;
    axios
      .delete(`${api_url}`)
      .then(res => res.data)
      .catch(error => console.log(error));
  },
  toggleTodo(context, payload) {
    // todos table의 completed 컬럼은 1, 0으로 저장이 되기 때문에...
    switch (payload.completed) {
      case 0:
        payload.completed = 1;
        break;
      case 1:
        payload.completed = 0;
        break;
      default:
        console.log('invalid Completed');
        break;
    }
    console.log(payload);
    axios
      .put(`${api_url}/${payload.id}`, payload)
      .then(res => res.data)
      .then(items => {
        state.todoItems[items.id] = items;
        this.getTodoItems;
      })
      .catch(error => console.log(error));
  }
};

const mutations = {
  setTodoItems(state, items) {
    state.todoItems = items;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
