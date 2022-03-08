import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id='todoForm' onSubmit={this.props.onSubmit}>
          <input 
            value={this.props.todoNameInput}
            onChange={this.props.onChange} 
            type="text" 
            placeholder='type todo'>
          </input>
          <input type='submit'></input>
        </form>
        <button onClick={this.props.toggleComplete}>
          {this.props.displayCompleted ? 'Hide' : 'Show'} Completed
        </button>
      </>
    )
  }
}
