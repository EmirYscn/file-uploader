import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { Folder } from "../types/models";

import Spinner from "./Spinner";

import {
  getFolderByShareUrl,
  getFoldersByShareUrlAndFolderId,
} from "../services/apiFolders";

import styled from "styled-components";

import { formatString } from "../utils/formatString";

const StyledFolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  height: 8rem;
  width: auto;
  cursor: pointer;
`;
const Details = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

function SharedFolders() {
  const [isLoading, setIsLoading] = useState(false);
  const [folders, setFolders] = useState<Folder[]>();
  const { shareUrl, folderId } = useParams();

  useEffect(() => {
    async function fetchSharedFolder() {
      try {
        setIsLoading(true);
        const folders =
          folderId !== undefined
            ? await getFoldersByShareUrlAndFolderId(shareUrl!, +folderId)
            : await getFolderByShareUrl(shareUrl!);
        setFolders(folders);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (shareUrl) fetchSharedFolder();
  }, [shareUrl, folderId]);

  const location = useLocation();
  const mainRoute = location.pathname.split("/")[1];

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {folders?.map((folder) => (
        <StyledFolder key={folder.id}>
          <Link to={`/${mainRoute}/${shareUrl}/folder/${folder.id}`}>
            <Img src="/folder.svg" alt="" />
          </Link>
          <Details>
            <span>{formatString(folder.name)}</span>
          </Details>
        </StyledFolder>
      ))}
    </>
  );
}

export default SharedFolders;
