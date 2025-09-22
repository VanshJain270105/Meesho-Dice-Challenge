import styled from "styled-components";

let Foot = styled.footer`
  padding: 50px 2.8vw;
  background-color: rgb(248, 248, 255);
  #section-1 {
    display: grid;
    grid-template-columns: 3fr 4fr 4fr;
    gap: 15px;
    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 850px) {
      grid-template-columns: 1fr;
    }
    #div-1 {
      grid-template-columns: 2fr;
      h1 {
        color: #353543;
        font-weight: normal;
      }
      p {
        margin: 15px 0;
        color: #786173;
        font-size: 15px;
        line-height: 140%;
        font-weight: normal;
      }
      img {
        height: 40px;
        ${"" /* aspect-ratio: 1; */}
        margin: 0px 0px 0 px 0;
        float: left;
        padding: 2px;
      }
    }
    > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      ${"" /* padding: 10px; */}
      p {
        color: #786173;
        margin-bottom: 13px;
        font-weight: 500;
      }
    }
    h3 {
      margin-bottom: 15px;
    }
    #icons img {
      height: 25px;
      aspect-ratio: 1;
      margin: 12px 13px;
      margin-left: 0;
    }
    h3 + p {
      font-size: 12px;
      line-height: 150%;
      font-weight: normal !important;
    }
  }
  #section-2 {
    border: 1px solid #cecede;
    background-color: #fff;
    padding: 15px;
    border-radius: 7px;

    h4 {
      font-size: 22px;
      margin-bottom: 10px;
      color: #353543;
    }
    .heading1 {
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      align-items: center;
      cursor: pointer;

      svg {
        height: 28px;
        width: 28px;
        cursor: inherit;
      }
    }

    hr {
      border: none;
      border-top: 1px solid #cecede;
      margin: 15px 0;
    }
    h6 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
      color: #353543;
    }
    h6 + p {
      margin: 12px 0;
      font-size: 13.5px;
      line-height: 140%;
      color: rgb(131, 97, 115);
      span {
        color: rgb(171, 32, 137);
        text-transform: capitalize;
        font-weight: bold;
      }
    }
    h4 {
      color: #353543;
      margin-bottom: 30px;
      margin-top: 30px;
      span {
        color: rgb(171, 32, 137);
      }
    }
    #pink-para {
      p {
        color: rgb(171, 32, 137);
        font-weight: 500;
        letter-spacing: 1.4px;
      }
    }
  }
`;

export { Foot };
