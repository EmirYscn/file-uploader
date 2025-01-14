import Folders from "../ui/Folders";
import useFolders from "../hooks/useFolders";

function Home() {
  const { folders, isLoading } = useFolders();

  return folders && <Folders folders={folders} isLoading={isLoading} />;
}

export default Home;
