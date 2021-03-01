import React from "react";
import SwipeIcon from "../../assets/icons/navbar-swipe.svg";
import ProfileIcon from "../../assets/icons/navbar-profile.svg";
import MessageIcon from "../../assets/icons/navbar-message.svg";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { lavenderBlush, mauvelous } from "../../theme";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      width: "1.75em",
      backgroundColor: mauvelous,
      padding: theme.spacing(0.7),
      borderRadius: "50%",
    },
    nav: {
      padding: theme.spacing(2, 4),
      display: "flex",
      justifyContent: "space-between",
      boxShadow: "0 -1em 1em rgba(0, 0, 0, 0.08)",
    },
    navWrapper: {
      backgroundColor: lavenderBlush,
      zIndex: theme.zIndex.appBar,
      position: "fixed",
      bottom: 0,
      width: "100%",
      boxSizing: "border-box",
    },
  })
);
const NavBar: React.FC = () => {
  const classes = useStyles();
  const navLinks = [
    { icon: ProfileIcon, link: "/profile" },
    { icon: SwipeIcon, link: "/matches" },
    { icon: MessageIcon, link: "/messages" },
  ];

  const links = navLinks.map((link, index) => {
    return (
      <Link to={link.link} key={index}>
        <img className={classes.icon} src={link.icon} alt={link.link} />
      </Link>
    );
  });

  return (
    <nav className={classes.navWrapper}>
      <div className={classes.nav}>{links}</div>
    </nav>
  );
};

export default NavBar;
