import { useContext, useState } from "react";
import { useSearchParams } from "react-router";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts/themeContext";
import Menus from "./Menus";
import { CgSortAz } from "react-icons/cg";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const ButtonContainer = styled.div`
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

function Sort() {
  const { isDark } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<number | null>(null);

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
