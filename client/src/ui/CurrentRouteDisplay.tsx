import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import styled, { css } from "styled-components";
import {
  getFolderNameAndParentIdById,
  getFolderNameById,
} from "../services/apiFolders";
import useHandleDrop from "../hooks/useHandleDrop";
import { Folder } from "../types/models";

const StyledCurrentRouteDisplay = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  color: #ceb40e;

  & span {
    display: flex;
    align-items: center;
  }
`;

const Span = styled.span<{ $isDragOver?: boolean | null }>`
  padding: 0.2rem;
  transition: all 0.2s;
  ${(props) =>
    props.$isDragOver &&
    css`
      border: 2px solid var(--color-green-700);
      border-radius: 8px;
      background-color: rgba(0, 128, 0, 0.1);
    `}
`;

const Img = styled.img`
  height: 2rem;
`;

function CurrentRouteDisplay() {
  const [folder, setFolder] = useState<Folder>();
  const { handleDragOver, handleDrop, handleDragLeave, dragOverFolderId } =
    useHandleDrop();
  const location = useLocation();
  const path = location.pathname.split("/");
  path.shift();
  const mainRoute = path.shift();
  const isInSubRoute = path.length > 0;
  const folderId = Number(path[path.length - 1]);

  useEffect(() => {
    async function fetchFolderName() {
      try {
        const folder = await getFolderNameAndParentIdById(folderId);
        setFolder(folder);
      } catch (error) {
        console.log(error);
      }
    }
    if (folderId) fetchFolderName();
  }, [folderId]);
  return (
    <>
      {isInSubRoute && (
        <StyledCurrentRouteDisplay>
          <Link to={`/${mainRoute}`}>{mainRoute}</Link>
          <Span>
            <Img src="/right-arrow.svg" alt="Right arrow" />{" "}
            <Span
              onDragOver={(e) => handleDragOver(e, folderId)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, folder?.parentId as number)}
              $isDragOver={folderId === dragOverFolderId}
            >
              ...
            </Span>
          </Span>
          <Span>
            <Img src="/right-arrow.svg" alt="Right arrow" /> folder
          </Span>
          <Span>
            <Img src="/right-arrow.svg" alt="Right arrow" />
            <Span>{folder?.name}</Span>
          </Span>
        </StyledCurrentRouteDisplay>
      )}
    </>
  );
}

export default CurrentRouteDisplay;
