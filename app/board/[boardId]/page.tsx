import { Canvas } from "./_components/canvas"
import { Room } from "@/components/common/room"
import { Loading } from "./_components/loading"

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

const BoardIdPage = ({params: {boardId}}: BoardIdPageProps) => {
  return (
    <Room fallback={<Loading />} roomId={boardId}>
      <Canvas boardId={boardId} />
    </Room>
  );
}

export default BoardIdPage