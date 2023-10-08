import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import TodoCard from "./components/TodoCard";
import { useState } from "react";
import TodoModal from "./components/TodoModal";
import { Todo } from "./Todo";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todo, setTodo] = useState<Todo>(new Todo(""));
  const [index, setIndex] = useState<number | null>(null);

  // useStateでTODOの管理
  const [todos, setTodos] = useState([
    new Todo("title1"),
    new Todo("title2"),
    new Todo("title3"),
  ]);

  const createTodo = () => {
    setIndex(null);
    onOpen();
  }

  // TODOを削除する
  const onClickDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodos = (todo: Todo, index: number) => {
    setIndex(index);
    setTodo(todo);
    onOpen();
  };

  return (
    <Box p="100px">
      <Center>
        <Flex w="600px">
          <Heading mb={8}>Todoアプリ</Heading>
          <Spacer />
          <Button colorScheme="blue" onClick={() => createTodo()}>
            登録
          </Button>
        </Flex>
      </Center>

      {todos.map((todo, index) => {
        return (
          <Box mt={2}>
            <Center>
              <Flex
                bg="gray.300"
                w="600px"
                p={4}
                borderRadius="5px"
                alignItems="center"
                boxShadow="base"
              >
                <TodoCard todo={todo} />
                <Spacer />
                <Box>
                  <Button
                    colorScheme="teal"
                    mr={2}
                    onClick={() => editTodos(todo, index)}
                  >
                    編集
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => onClickDelete(index)}
                  >
                    削除
                  </Button>
                </Box>
              </Flex>
            </Center>
          </Box>
        );
      })}

      <TodoModal
        isOpen={isOpen}
        onClose={onClose}
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
        index={index}
      />
    </Box>
  );
}

export default App;
