import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { accessType } from "../types/enums";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: Position }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props?.position!.x}px;
  top: ${(props) => props?.position!.y}px;
`;

// Forward the ref within the same file
// const ForwardedStyledList = React.forwardRef<
//   HTMLUListElement,
//   { position: Position }
// >((props, ref) => <StyledList {...props} ref={ref} />);

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type Position = { x: number; y: number } | null;

type MenusContextType = {
  openId: number | string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<number | string>>;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
};

type MenusProps = {
  children: React.ReactNode;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<number | string>("");
  const [position, setPosition] = useState<Position>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

type ToggleProps = {
  id: number | string;
  children?: React.ReactNode;
};

function Toggle({ id, children }: ToggleProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }
  const { openId, close, open, setPosition } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const button = (e.target as HTMLElement).closest("button");
    if (button) {
      const rect = button.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
      if (openId === "" || openId !== id) open(id);
      else close();
    }
  }

  if (children) {
    return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

type ListProps = {
  id: number;
  children: React.ReactNode;
};

function List({ id, children }: ListProps) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }
  const { openId, position, close } = context;

  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  isFolderOwner?: boolean | undefined;
  accessType?: accessType | null;
};

function Button({
  children,
  icon,
  onClick,
  isFolderOwner,
  accessType,
}: ButtonProps) {
  const context = useContext(MenusContext);
  // const disabled = accessType ? accessType !== "FULL" : false;
  const disabled =
    (accessType && accessType !== "FULL") || (!accessType && !isFolderOwner);
  console.log(isFolderOwner);
  if (!context) {
    throw new Error("Toggle must be used within a MenusProvider");
  }
  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
