import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { Folder } from "../types/models";

import styled from "styled-components";

import Spinner from "./Spinner";

import { formatString } from "../utils/formatString";
import {
  getFolderByShareUrl,
  getFoldersByShareUrlAndFolderId,
} from "../services/apiFolders";

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
            {/* <Modal>
              <Menus>
                <Menus.Menu>
                  <Menus.Toggle id={folder.id} />
                  <Menus.List id={folder.id}>
                    <Modal.Open opens="rename">
                      <Menus.Button
                        icon={<MdDriveFileRenameOutline />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        accessType={folder.accessType}
                      >
                        Rename
                      </Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="share">
                      <Menus.Button
                        icon={<MdPersonAddAlt1 />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        accessType={folder.accessType}
                      >
                        Share to a User
                      </Menus.Button>
                    </Modal.Open>

                    <Menus.Button
                      icon={<IoMdLink />}
                      isFolderOwner={folder.userId === currentUser?.id}
                      accessType={folder.accessType}
                      onClick={() => handleCopyFolderLink(folder.id)}
                    >
                      Copy Link
                    </Menus.Button>

                    <Modal.Open opens="delete">
                      <Menus.Button
                        icon={<RiDeleteBin2Line />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        accessType={folder.accessType}
                      >
                        Delete
                      </Menus.Button>
                    </Modal.Open>
                  </Menus.List>
                  <Modal.Window name="delete">
                    <ConfirmDelete
                      resourceName={folder.name}
                      disabled={isDeletingFolder}
                      onConfirm={() => handleDeleteFolder(folder.id)}
                    />
                  </Modal.Window>
                  <Modal.Window name="rename">
                    <RenameFolderForm
                      resourceName={folder.name}
                      disabled={isRenamingFolder}
                      onConfirm={(data: Folder) =>
                        handleRenameFolder(folder.id, data)
                      }
                    />
                  </Modal.Window>
                  <Modal.Window name="share">
                    <ShareFolder
                      onConfirm={(data: ShareFolderData) =>
                        handleShareFolder(data, folder.id)
                      }
                      disabled={isSharingFolder}
                    />
                  </Modal.Window>
                </Menus.Menu>
              </Menus>
            </Modal> */}
          </Details>
        </StyledFolder>
      ))}
    </>
  );
}

export default SharedFolders;
