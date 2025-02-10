import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled, { css } from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";

import { ThemeContext } from "../contexts/themeContext";

const StyledModal = styled.div<{ isdark?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 300;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-300);
    `}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

type ModalContextType = {
  openName: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
  isDark?: boolean;
};

const ModalContext = createContext({} as ModalContextType);

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  const { isDark } = useContext(ThemeContext);
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open, isDark }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  opens: string;
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

type WindowProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  name: string;
};

function Window({ children, name }: WindowProps) {
  const { openName, close, isDark } = useContext(ModalContext);

  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref} isdark={isDark}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
