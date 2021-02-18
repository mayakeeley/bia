import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  TextField,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { cities } from "./cities";
import { RelayUser } from "types";
import { grey, jordyBlue } from "theme";
import { Adjust as FillerIcon } from "@material-ui/icons";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoText: {
      color: grey,
    },

    input: { borderRadius: "20px", width: "100%" },
    icon: { color: jordyBlue },
    helpIcon: { fontSize: "24px" },
    titleAndInfo: { padding: theme.spacing(2, 0) },
    autocomplete: {
      "&>div>div": {
        top: "calc(50% - 20px)",
      },
    },
  })
);

const Bio: React.FC<{
  values: RelayUser;
  setValues: (values: RelayUser) => void;
}> = ({ values, setValues }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.titleAndInfo}>
        <Typography variant="h4">Bio</Typography>

        <Typography variant="subtitle2" className={classes.infoText}>
          Write a short bio to
          <br /> introduce yourself
        </Typography>
      </div>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="goal1"
            name="Goal 1"
            multiline
            rows={10}
            inputProps={{
              "data-testid": `create-profile-bio`,
            }}
            variant={"outlined"}
            onChange={(e) => setValues({ ...values, about: e.target.value })}
            value={values.about}
            className={classes.input}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Bio;