import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Todo } from "../Todo"

type Props = {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number | null;
};

const TodoModal = (props: Props) => {
  const { isOpen, onClose, todo, setTodo, todos, setTodos, index } = props;

  const [nameError, setNameError] = useState("");

  // TODOを登録する
  const createTodo = () => {
    if (todo.name == "") {
      setNameError("1文字以上入力してください");
      return;
    }
    setTodos([...todos, todo]);

    // const [ a, setA ] = useState([1, 2, 3, 4, 5]) ListObject 000001
    // const newA = [1, 3, 6]  ListObject 000002
    // setA(newA)
    // 1,2,3,4,5
    // 1,3,6
    // a[0] = 100000
    // a   [100000, 2, 3,4,5] ListObject 000001
    // setA(a) 変更されない
    // const newTodo = Todo { name: "bbb" }
    // setTodo(newTodo)
    // new Todo { name: "bbb" }
    setTodo(new Todo(""));
    setNameError("");
    onClose();
  };

  // キャンセルを押すとモーダルが閉じる
  const cancelTodo = () => {
    setTodo(new Todo(""));
    setNameError("");
    onClose();
  };

  const editTodo = () => {
    if (todo.name == "") {
      setNameError("1文字以上入力してください");
      return;
    }

    todos[index!] = todo;
    setTodos([...todos])

    setTodo(new Todo(""));
    setNameError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新規登録</ModalHeader>
        <ModalBody>
          <Text mb="8px">タイトル</Text>
          <Input
            size="sm"
            mb={2}
            value={todo.name}
            onChange={(e) => {
              setTodo(new Todo(e.target.value));
            }}
          />
          <Text color="red">{nameError}</Text>
          <Flex>
            <Spacer />
            {index == null ? (
              <Button colorScheme="blue" mr={2} onClick={() => createTodo()}>
                登録
              </Button>
            ) : (
              <Button colorScheme="teal" mr={2} onClick={() => editTodo()}>
                更新
              </Button>
            )}
            <Button colorScheme="gray" onClick={() => cancelTodo()}>
              キャンセル
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TodoModal;
