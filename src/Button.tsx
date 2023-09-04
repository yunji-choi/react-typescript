import { useSetRecoilState } from "recoil";

import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { isDarkAtom } from "./atoms";

const Button = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  div {
    display: inline-block;
    background-color: ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.textColor};
    border-radius: 10px;
    /* width: 100px; */
    margin-top: 30px;
    padding: 10px 10px;
  }
`;

function ThemeButton() {
  const setIsDark = useSetRecoilState(isDarkAtom);
  return (
    <Button>
      <span
        onClick={() => {
          setIsDark((prev) => !prev);
        }}
      >
        <div>Change Mode</div>
      </span>
    </Button>
  );
}

function HomeButton() {
  return (
    <Button>
      <Link to="/">
        <div>Back</div>
      </Link>
    </Button>
  );
}

export { ThemeButton, HomeButton };
