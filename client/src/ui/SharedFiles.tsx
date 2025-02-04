import styled from "styled-components";
import { AiOutlineDownload } from "react-icons/ai";

import Modal from "./Modal";
import Menus from "./Menus";
import Spinner from "./Spinner";

import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";

import { File as FileType } from "../types/models";
import useDownloadFile from "../hooks/useDownloadFile";
import { formatString } from "../utils/formatString";

import {
  getFileByShareUrl,
  getFilesByShareUrlAndFolderId,
} from "../services/apiFiles";
import FileInfo from "./FileInfo";

const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

function SharedFiles() {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileType[]>();
  const { shareUrl, folderId } = useParams();

  useEffect(() => {
    async function fetchSharedFile() {
      try {
        setIsLoading(true);
        const files = folderId
          ? await getFilesByShareUrlAndFolderId(shareUrl!, +folderId)
          : await getFileByShareUrl(shareUrl!);
        setFiles(files);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (shareUrl) fetchSharedFile();
  }, [shareUrl, folderId]);

  const { handleDownloadFile } = useDownloadFile();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {files?.map((file) => (
            <File key={file.id} draggable={true}>
              <Link to={`file/${file.id}`}>
                <Img src="/file.svg" />
                {/* <FileInfo file={file} /> */}
              </Link>
              <Details>
                <span>{formatString(file.name)}</span>
                <Modal>
                  <Menus>
                    <Menus.Menu>
                      <Menus.Toggle id={file.id} />
                      <Menus.List id={file.id}>
                        <Menus.Button
                          icon={<AiOutlineDownload />}
                          onClick={() => handleDownloadFile(file.id, file.name)}
                          accessType={"FULL"}
                        >
                          Download
                        </Menus.Button>
                      </Menus.List>
                    </Menus.Menu>
                  </Menus>
                </Modal>
              </Details>
            </File>
          ))}
        </>
      )}
    </>
  );
}

export default SharedFiles;
