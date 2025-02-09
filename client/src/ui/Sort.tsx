import { useContext, useState } from "react";
import { useSearchParams } from "react-router";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts/themeContext";
import Menus from "./Menus";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { FaSortDown, FaSortUp } from "react-icons/fa";
// import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";

const ButtonContainer = styled.div`
  margin-top: -2rem;
  margin-bottom: 3rem;
  max-width: 10rem;
  justify-self: end;

  & button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    background: none;
  }
`;

const Select = styled.select<{ isdark?: boolean }>`
  appearance: none;
  background-color: #f9f9f9;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  color: #333;
  width: 100%;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
  }

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 20px 20;

  & option {
    background-color: #fff;
    color: #333;
    font-size: 16px;
    padding: 8px;
  }

  & option:disabled {
    color: #999;
  }

  & option:hover {
    background-color: #f0f8ff;
  }

  ${(props) =>
    props.isdark &&
    css`
      background-color: #333;
      color: #f9f9f9;
      /* border: 1px solid #ccc; */
      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
      }
      & option {
        background-color: #333;
        color: #f9f9f9;
      }
      & option:hover {
        background-color: #f9f9f9;
      }
    `}
`;
const SortButton = styled.button<{ isdark?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background: ${(props) => (props.isdark ? "#444" : "#f1f1f1")};
  color: ${(props) => (props.isdark ? "#fff" : "#333")};
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.isdark ? "#555" : "#ddd")};
  }
`;

function Sort() {
  const { isDark } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Get the current sort value from URL or set default
  const sortValue = searchParams.get("sort") || "default";
  const sortOrder = searchParams.get("order") || "asc";

  // Handle sort selection change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSearchParams({ sort: selectedSort, order: sortOrder }); // Update URL with selected sort
  };

  const toggleSortOrder = () => {
    setSearchParams({
      sort: sortValue,
      order: sortOrder === "asc" ? "desc" : "asc",
    });
  };
  return (
    <ButtonContainer>
      <Menus>
        <Menus.Toggle id={1} icon={<CgSortAz />} />
        <Menus.List id={1}>
          <Menus.Button
            icon={<FaSortDown />}
            accessType={"FULL"}
            onClick={() => {
              setSearchParams({ sort: "date", order: "desc" });
              setSelectedId(1);
            }}
            isSelected={selectedId === 1}
          >
            Newest First
          </Menus.Button>
          <Menus.Button
            icon={<FaSortUp />}
            accessType={"FULL"}
            onClick={() => {
              setSearchParams({ sort: "date", order: "asc" });
              setSelectedId(2);
            }}
            isSelected={selectedId === 2}
          >
            Oldest First
          </Menus.Button>
          <Menus.Button
            icon={<FaSortDown />}
            accessType={"FULL"}
            onClick={() => {
              setSearchParams({ sort: "name", order: "desc" });
              setSelectedId(3);
            }}
            isSelected={selectedId === 3}
          >
            Z-A
          </Menus.Button>
          <Menus.Button
            icon={<FaSortUp />}
            accessType={"FULL"}
            onClick={() => {
              setSearchParams({ sort: "name", order: "asc" });
              setSelectedId(4);
            }}
            isSelected={selectedId === 4}
          >
            A-Z
          </Menus.Button>

          <Menus.Button
            icon={<FaSortDown />}
            accessType={"FULL"}
            onClick={() => {
              setSearchParams({ sort: "size", order: "desc" });
              setSelectedId(5);
            }}
            isSelected={selectedId === 5}
          >
            Largest First
          </Menus.Button>
          <Menus.Button
            icon={<FaSortUp />}
            accessType={"FULL"}
            onClick={() => {
              setSearchParams({ sort: "size", order: "asc" });
              setSelectedId(6);
            }}
            isSelected={selectedId === 6}
          >
            Smallest First
          </Menus.Button>
        </Menus.List>
      </Menus>
    </ButtonContainer>
  );
}

export default Sort;

{
  /* <Select
        name="sort"
        id="sort"
        value={sortValue}
        onChange={handleSortChange}
        isdark={isDark}
      >
        <option value="default" disabled>
          Sort By
        </option>
        <option value="name">Name</option>
        <option value="size">Size</option>
        <option value="date">Date</option>
      </Select> */
}
{
  /* <SortButton onClick={toggleSortOrder} isdark={isDark}>
        {sortOrder === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
      </SortButton> */
}
