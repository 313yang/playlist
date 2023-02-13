import styled from "styled-components";

export default function Spinner() {
  return (
    <div style={{ position: "absolute", width: "100vw", height: "100vh", top: 0, left: 0 }}>
      <SpinnerStyle>
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
        <div className="bar4" />
        <div className="bar5" />
        <div className="bar6" />
        <div className="bar7" />
        <div className="bar8" />
      </SpinnerStyle>
    </div>
  );
}

const SpinnerStyle = styled.div`
  position: relative;
  width: calc(100% - 220px);
  height: 50vh;
  display: inline-block;

  margin: 200px auto;
  /* margin-left: 60%;
  margin-right: 40%; */
  margin-left: 220px;
  border-radius: 10px;

  div {
    width: 4px;
    height: 10px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;

    opacity: 0;
    border-radius: 50px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    animation: fade 1s linear infinite;
  }

  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.25;
    }
  }

  div.bar1 {
    transform: rotate(0deg) translate(0, -130%);
    animation-delay: 0s;
  }

  div.bar2 {
    transform: rotate(45deg) translate(0, -130%);
    animation-delay: -0.9167s;
  }

  div.bar3 {
    transform: rotate(90deg) translate(0, -130%);
    animation-delay: -0.833s;
  }
  div.bar4 {
    transform: rotate(135deg) translate(0, -130%);
    animation-delay: -0.7497s;
  }
  div.bar5 {
    transform: rotate(180deg) translate(0, -130%);
    animation-delay: -0.667s;
  }
  div.bar6 {
    transform: rotate(225deg) translate(0, -130%);
    animation-delay: -0.5837s;
  }
  div.bar7 {
    transform: rotate(270deg) translate(0, -130%);
    animation-delay: -0.48s;
  }
  div.bar8 {
    transform: rotate(315deg) translate(0, -130%);
    animation-delay: -0.3167s;
  }
  /* 
  div.bar9 {
    transform: rotate(288deg) translate(0, -130%);
    animation-delay: -0.333s;
  }
  div.bar10 {
    transform: rotate(324deg) translate(0, -130%);
    animation-delay: -0.2497s;
  } */
`;
