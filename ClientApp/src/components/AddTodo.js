import React, { Component } from 'react'

export default class AddTodo extends Component {
    state = {
        title: '',
        date: ''
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onSubmit = (e) => {
        if (this.state.title.length > 0) {
            e.preventDefault();
            this.props.addTodo(this.state.title);
            this.setState({ title: '' })
            createdOn: new Date().toUTCString()
        }
        else {
            alert("Desciption is empty")
        }

    }
    render() {
        return (
            <form onSubmit={this.onSubmit} className='todo-form'>
                <input
                    type='text'
                    name='title'
                    placeholder='Add a todo'
                    className='todo-input'
                    value={this.state.title}
                    onChange={this.onChange} />
                <input
                    type="submit"
                    value="Submit"
                    className="todo-button"
                />

            </form>
        )
    }
}