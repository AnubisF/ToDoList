import React, { Component } from 'react';
import AddTodo from './AddTodo'
import { RiCloseCircleLine } from 'react-icons/ri';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { todos: [], loading: true };
    }

    componentDidMount() {

        this.populateWeatherData();
    }
    delTodo = async (id) => {
        await fetch('todolist',
            {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: id
            }).then(res => {
                this.setState({

                    todos: [...this.state.todos.filter(todo => todo.id !== id)]
                })
            })


    }
    addTodo = async (title) => {

        await fetch('todolist/add',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(title)
            }).then(response => response.json()).then(res => {
                this.setState({ todos: [...this.state.todos, res] })
            }
            )

    }
    async markComplete(Todo) {
        console.log("Json:")
        console.log(JSON.stringify(Todo))
        let dbTodo = { ...Todo }
        dbTodo.state = !dbTodo.state
        await fetch('todolist/update',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dbTodo)
            }).then(response => response.text()).then(res => {
                console.log("response is :")
                console.log(res)
                this.setState({
                    todos: this.state.todos.map(todo => {

                        if (todo.id === Todo.id) {
                            todo.state = !todo.state
                        }
                        return todo;
                    })
                });
            });


    }
    getStyle = (Todo) => {
        return {
            textDecoration: Todo.state ? 'line-through' : 'none'
        }
    }
    static renderTodos(self, Todos) {
        return Todos.map(Todo => (
            <div
                className='todo-row'
                key={Todo.id}
            >
                <input checked={Todo.state} type="checkbox" onChange={() => self.markComplete(Todo)} />
                    <div style={self.getStyle(Todo)}>{Todo.description}</div>
                    <div>
                        <div className='icons'>
                            <RiCloseCircleLine
                                onClick={() => self.delTodo(Todo.id)} className='delete-icon'
                        />
                        </div>
                    </div>
                </div>
        ));
    }

    render() {
        var self = this
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderTodos(self, this.state.todos);

        return (
            <div>
                <h1 id="tabelLabel" >Todo App</h1>
                <AddTodo addTodo={this.addTodo} />
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('todolist');
        const data = await response.json();
        this.setState({ todos: data, loading: false });
    }
}