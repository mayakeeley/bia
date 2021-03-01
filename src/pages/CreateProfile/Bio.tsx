import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import { grey } from "theme";
import { UserModel } from "models/user.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleAndInfo: { padding: theme.spacing(2, 0) },
    infoText: {
      color: grey,
    },
    input: { borderRadius: "1.25em", width: "100%" },
  })
);

const Bio: React.FC<{
  values: UserModel;
  setValues: (values: UserModel) => void;
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
