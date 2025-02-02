import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import { File, FileWithUserInfo } from "../types/models";
import { FiInfo } from "react-icons/fi";

const StyledInfo = styled.div`
  position: absolute;
  right: 5px;
  top: 1px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1em;
  font-size: 1.5rem;
`;

function Info({ file }: { file: FileWithUserInfo }) {
  const uploadDate = new Date(file.uploadDate);
  const fileSize =
    file.size > 1024 * 1024
      ? (file.size / (1024 * 1024)).toFixed(2)
      : (file.size / 1024).toFixed(2);
  const fileType = file.size > 999999 ? "MB" : "KB";
  return (
    <StyledInfo>
      <span
        className={`info-button-${file.id}`}
        data-tooltip-id={`tooltip-${file.id}`}
      >
        <FiInfo />
      </span>
      <Tooltip id={`tooltip-${file.id}`} place="bottom">
        <InfoBox>
          <span>
            <strong>Size:</strong> {fileSize} {fileType}
          </span>
          <p>
            <strong>Uploaded By:</strong> {file.uploadedBy?.username}
          </p>
          <p>
            <strong>Uploaded Date:</strong> {uploadDate.toDateString()}
          </p>
        </InfoBox>
      </Tooltip>
    </StyledInfo>
  );
}

export default Info;
