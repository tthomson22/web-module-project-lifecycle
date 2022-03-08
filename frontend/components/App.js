import React from 'react'
import axios from 'axios'

import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true,
  }

  onChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoNameInput: value})
  }

  resetForm = () => this.setState({ ...this.state, todoNameInput: '' })
  setAxiosResponseError = err => {
    this.setState({...this.state, error: err.response.data.message})
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.setAxiosResponseError)
  }

  onSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state,
        todos: res.data.data
      })
    })
    .catch(this.setAxiosResponseError)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map(td => {
            if(td.id !== id){
              return td
            } else {
              return res.data.data
            }
          })
        })
      })
      .catch(this.setAxiosResponseError)
  }

  toggleComplete = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }

  componentDidMount(){
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <div id = "error">Error: {this.state.error}</div>
        <TodoList
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleCompleted={this.toggleCompleted}
        />
        <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          toggleComplete={this.toggleComplete}
          todoNameInput={this.state.todoNameInput}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}
