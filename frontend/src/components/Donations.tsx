import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

//Media
import { ClassNames } from "@emotion/react";
import HeroImg from "../images/hero-image.png";

//MUI
import { makeStyles, Grid, Typography } from "@material-ui/core";
import theme from "../util/theme";

const useStyles = makeStyles({
  donationsSection: {
    position: "relative",
    margin: "100px 0",
    width: "100%",
    maxWidth: "1440px",
    left: "50%",
    transform: " translateX(-50%)",

    "& section": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      position: "relative",
      maxWidth: "1440px",
      left: "50%",
      transform: "translateX(-50%)",

      "& .background-box": {
        justifySelf: "center",
        position: "absolute",
        height: "320px",
        backgroundColor: "#F7C86F",
        width: "60%",
        opacity: " 0.3",
        top: "30%",
        left: "50%",
        transform: "translateX(-50%)",
      },

      "& .image-wrapper": {
        width: "480px",
        height: "auto",
        margin: "0",
        display: "flex",
        justifySelf: "flex-end",
        position: "relative",

        "& img": {
          width: "100%",
          height: "auto",
          objectFit: "cover",
        },
      },

      "& .text-wrapper": {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingLeft: "44px",
        paddingRight: "356px",

        "& h3": {
          color: "#C58C41",
          fontFamily: "'Playfair Display', serif",
          fontSize: "4.5rem",
          lineHeight: "5rem",
          fontWeight: "700",
          margin: " 0",
          paddingBottom: "28px",
        },

        "& p": {
          color: "#3C3C3B",
          textAlign: "left",
          fontSize: "1rem",
          lineHeight: " 1.5rem",
          fontWeight: "400",
          fontFamily: "Montserrat",
          paddingBottom: "16px",
          margin: "0",

          "& span": {
            fontFamily: "Montserrat",
            fontWeight: "900",
          },
        },

        "& button": {
          width: "105px",
          height: " 35px",
          border: "2px solid #C58C41",
          color: "#C58C41",
          backgroundColor: "transparent",
          fontSize: "14px",
          lineHeight: "19px",
          fontWeight: "500",
        },
      },
    },
  },
});

const Donations = () => {
  const classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation();

  return (
    <Grid classes={{ root: classes.donationsSection }}>
      <section>
        <div className="background-box"></div>

        <figure className="image-wrapper">
          <img src={HeroImg} style={{ width: "100%", height: "auto" }} />
        </figure>

        <section className="text-wrapper">
          <Typography component="h3">{t("allTheSmallBitsHelp")}</Typography>
          <Typography component="p">{t("byDonatingACupOfCoffee")}</Typography>
          <button onClick={() => history.push("/donate")}>
            {t("donate")} ☕
          </button>
        </section>
      </section>
    </Grid>
  );
};

export default Donations;
