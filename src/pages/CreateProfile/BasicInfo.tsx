import React from "react";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    infoText: {
      color: grey,
    },
    inputs: {
      marginTop: theme.spacing(4),
    },
    input: { borderRadius: "20px", width: "100%" },
    icon: { color: jordyBlue },
    titleAndInfo: { padding: theme.spacing(2, 0) },

    autocomplete: {
      "&>div>div": {
        top: "calc(50% - 20px)",
      },
    },
  })
);

const BasicInfo: React.FC<{
  values: RelayUser;
  setValues: (values: RelayUser) => void;
}> = ({ values, setValues }) => {
  const classes = useStyles();

  console.log(values);
  return (
    <>
      <div className={classes.titleAndInfo}>
        <Typography variant="h4" gutterBottom>
          Name & Age
        </Typography>
        <Typography variant="subtitle2" className={classes.infoText}>
          Enter your first name and
          <br /> select your birthday
        </Typography>
      </div>
      <Grid container className={classes.inputs}>
        <Grid item>
          <Typography paragraph>First Name</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="firstName"
            name="First Name"
            inputProps={{
              "data-testid": `create-profile-first-name`,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FillerIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
            variant={"outlined"}
            size="small"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            value={values.name}
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <Typography paragraph>Date of Birth</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="date"
            type="date"
            variant={"outlined"}
            value={values.dob}
            onChange={(e) => setValues({ ...values, dob: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FillerIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
            size="small"
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <Typography paragraph>Location</Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={cities}
            value={values.location}
            autoHighlight
            size="small"
            data-testid="cities-drop-down-value-selection"
            onChange={(_, e) => setValues({ ...values, location: e || "" })}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                id="country-name"
                inputProps={{
                  ...params.inputProps,
                  "data-testid": "country-name",
                }}
                className={classes.autocomplete}
                data-testid="country-dropdown-text-field"
                name="City"
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BasicInfo;
