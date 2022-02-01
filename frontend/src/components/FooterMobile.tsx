import { makeStyles } from "@material-ui/core";
import theme from "../util/theme";

//project resources
import { Newsletter } from "./Newsletter/Newsletter";

const FooterMobile = () => {
  const classes = makeStyles(theme as any)();

  return (
    <div>
      <Newsletter />
      <div
        style={{
          backgroundColor: "#48808B",
          display: "flex",
          flexDirection: "column",
          padding: "5% 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <a
            style={{
              color: "white",
              fontFamily: "Montserrat",
              fontSize: "14px",
              lineHeight: "19px",
              margin: "0 2%",
              fontStyle: "normal",
              fontWeight: "300",
            }}
          >
            Terms of service
          </a>
          <a
            style={{
              color: "white",
              fontFamily: "Montserrat",
              fontSize: "14px",
              lineHeight: "19px",
              margin: "0 2%",
              fontStyle: "normal",
              fontWeight: "300",
            }}
          >
            Privacy
          </a>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              color: "white",
              fontFamily: "Montserrat",
              fontSize: "16px",
              lineHeight: "22px",
              fontStyle: "normal",
            }}
          >
            The Clothing Loop{" "}
            <span style={{ fontWeight: "300" }}> &copy; 2022</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;