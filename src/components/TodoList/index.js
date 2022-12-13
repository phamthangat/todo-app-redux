import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { todoRemainingSelector } from '../../redux/selector';

export default function TodoList() {
  const [todoName, setTodoName] = useState('');

  const [priority, setPriority] = useState('Medium');

  const Option = ['High', 'Medium', 'Low']

  const todoList = useSelector(todoRemainingSelector);
  // const searchtext = useSelector(searchTextSelector);

  // console.log({todoList})

  const dispatch = useDispatch();

  const handleAddButtonClick = (e) => {
    dispatch(addTodo({
      id: uuidv4(),
      name: todoName,
      priority: priority,
      completed: false
    }))
    setTodoName('');
    setPriority('Medium');
  }

  const handleInputChange = (e) => {
    // console.log(e.target.value)
    setTodoName(e.target.value)
  }

  const handlePriority = (value) => {
    // console.log(value)
    setPriority(value)
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            priority={todo.priority}
            completed={todo.completed}
          />))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={handleInputChange} />
          <Select defaultValue="Medium" value={priority} onChange={handlePriority}>
            {Option.map((option, index) => (
              <Select.Option key={index} value={option} label={option}>
                <Tag color={option === 'High' ? 'red' : option === 'Medium' ? 'blue' : 'gray'}>{option}</Tag>
              </Select.Option>
            ))}
          </Select>
          <Button type='primary' onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
