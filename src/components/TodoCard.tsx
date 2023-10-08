import { Box } from "@chakra-ui/react";
import { Todo } from "../Todo";


type Props = {
  todo: Todo;
};

const TodoCard = (props: Props) => {

	// props.titleでもok
  const { todo } = props;

  return (
    <Box>{todo.name}</Box>
  );
}

export default TodoCard